from __future__ import annotations

import argparse
import math
import os
import re
import subprocess
import sys
import tempfile
import wave
from dataclasses import dataclass
from pathlib import Path

import imageio_ffmpeg
import numpy as np


@dataclass(frozen=True)
class VideoInfo:
    width: int
    height: int
    duration: float
    sample_rate: int | None
    channels: int | None


def get_ffmpeg() -> str:
    return os.environ.get('FFMPEG', imageio_ffmpeg.get_ffmpeg_exe())


def run(command: list[str], *, input_bytes: bytes | None = None, check: bool = True) -> subprocess.CompletedProcess[bytes]:
    try:
        return subprocess.run(command, input=input_bytes, check=check, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    except subprocess.CalledProcessError as error:
        stderr = error.stderr.decode('utf-8', errors='ignore') if error.stderr else ''
        if stderr:
            print(stderr, file=sys.stderr)
        raise


def probe_video(ffmpeg: str, path: Path) -> VideoInfo:
    result = run([ffmpeg, '-hide_banner', '-i', str(path)], check=False)
    text = result.stderr.decode('utf-8', errors='ignore')

    duration_match = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', text)
    if not duration_match:
        raise RuntimeError(f'Could not determine duration for {path}')
    hours, minutes, seconds = duration_match.groups()
    duration = int(hours) * 3600 + int(minutes) * 60 + float(seconds)

    video_match = re.search(r', (\d+)x(\d+)(?:\s|,)', text)
    if not video_match:
        raise RuntimeError(f'Could not determine frame size for {path}')
    width, height = map(int, video_match.groups())

    audio_match = re.search(r'Audio: .*?, (\d+) Hz, (?:stereo|mono|(\d+) channels)', text)
    if audio_match:
        sample_rate = int(audio_match.group(1))
        channels = 2 if 'stereo' in audio_match.group(0) else 1 if 'mono' in audio_match.group(0) else int(audio_match.group(2) or '2')
    else:
        sample_rate = None
        channels = None

    return VideoInfo(width=width, height=height, duration=duration, sample_rate=sample_rate, channels=channels)


def extract_frame(ffmpeg: str, path: Path, time_seconds: float, width: int, height: int) -> np.ndarray:
    result = run([
        ffmpeg,
        '-hide_banner',
        '-ss', f'{time_seconds:.3f}',
        '-i', str(path),
        '-frames:v', '1',
        '-f', 'rawvideo',
        '-pix_fmt', 'rgb24',
        'pipe:1',
    ])
    frame = np.frombuffer(result.stdout, dtype=np.uint8)
    if frame.size != width * height * 3:
        raise RuntimeError('Could not decode a frame from the intro video')
    return frame.reshape((height, width, 3))


def estimate_crop(frame: np.ndarray, target_ratio: float) -> tuple[int, int, int, int]:
    mask = np.any(frame < 245, axis=2)
    points = np.argwhere(mask)
    if points.size == 0:
        height, width = frame.shape[:2]
        crop_width = int(width * 0.42)
        crop_height = int(crop_width / target_ratio)
        x = (width - crop_width) // 2
        y = max((height - crop_height) // 2, 0)
        return crop_width, crop_height, x, y

    top, left = points.min(axis=0)
    bottom, right = points.max(axis=0)
    bbox_width = right - left + 1
    bbox_height = bottom - top + 1
    pad_x = int(bbox_width * 0.12)
    pad_y = int(bbox_height * 0.12)
    left = max(left - pad_x, 0)
    right = min(right + pad_x, frame.shape[1] - 1)
    top = max(top - pad_y, 0)
    bottom = min(bottom + pad_y, frame.shape[0] - 1)

    crop_width = right - left + 1
    crop_height = bottom - top + 1
    center_x = left + crop_width / 2
    center_y = top + crop_height / 2

    current_ratio = crop_width / crop_height
    if current_ratio > target_ratio:
        crop_height = int(round(crop_width / target_ratio))
    else:
        crop_width = int(round(crop_height * target_ratio))

    frame_height, frame_width = frame.shape[:2]
    crop_width = min(crop_width, frame_width)
    crop_height = min(crop_height, frame_height)

    x = int(round(center_x - crop_width / 2))
    y = int(round(center_y - crop_height / 2))
    x = max(0, min(x, frame_width - crop_width))
    y = max(0, min(y, frame_height - crop_height))
    return crop_width, crop_height, x, y


def fit_crop_to_ratio(crop: tuple[int, int, int, int], frame_shape: tuple[int, int, int], target_ratio: float) -> tuple[int, int, int, int]:
    crop_width, crop_height, x, y = crop
    frame_height, frame_width = frame_shape[:2]
    center_x = x + crop_width / 2
    center_y = y + crop_height / 2

    current_ratio = crop_width / crop_height
    if current_ratio > target_ratio:
        crop_height = int(round(crop_width / target_ratio))
    else:
        crop_width = int(round(crop_height * target_ratio))

    crop_width = min(crop_width, frame_width)
    crop_height = min(crop_height, frame_height)
    x = int(round(center_x - crop_width / 2))
    y = int(round(center_y - crop_height / 2))
    x = max(0, min(x, frame_width - crop_width))
    y = max(0, min(y, frame_height - crop_height))
    return crop_width, crop_height, x, y


def pick_sharpest_frame(ffmpeg: str, path: Path, info: VideoInfo, crop: tuple[int, int, int, int], sample_times: list[float]) -> np.ndarray:
    crop_width, crop_height, crop_x, crop_y = crop
    best_score = -1.0
    best_frame: np.ndarray | None = None

    for time_seconds in sample_times:
        frame = extract_frame(ffmpeg, path, time_seconds, info.width, info.height)
        cropped = frame[crop_y:crop_y + crop_height, crop_x:crop_x + crop_width]
        gray = cropped.mean(axis=2)
        score = float(np.abs(np.diff(gray, axis=0)).mean() + np.abs(np.diff(gray, axis=1)).mean())
        if score > best_score:
            best_score = score
            best_frame = cropped

    if best_frame is None:
        raise RuntimeError('Could not select a still frame')
    return best_frame


def encode_still(ffmpeg: str, frame: np.ndarray, output: Path, size: tuple[int, int]) -> None:
    width, height = size
    resized = np.ascontiguousarray(frame)
    run([
        ffmpeg,
        '-hide_banner',
        '-y',
        '-f', 'rawvideo',
        '-pix_fmt', 'rgb24',
        '-s', f'{resized.shape[1]}x{resized.shape[0]}',
        '-i', 'pipe:0',
        '-vf', f'scale={width}:{height}:flags=lanczos',
        '-frames:v', '1',
        str(output),
    ], input_bytes=resized.tobytes())


def extract_audio(ffmpeg: str, path: Path, info: VideoInfo, duration: float) -> tuple[np.ndarray, int]:
    sample_rate = info.sample_rate or 44100
    channels = info.channels or 2
    result = run([
        ffmpeg,
        '-hide_banner',
        '-y',
        '-i', str(path),
        '-t', f'{duration:.3f}',
        '-vn',
        '-ac', str(channels),
        '-f', 'f32le',
        '-ar', str(sample_rate),
        'pipe:1',
    ])
    audio = np.frombuffer(result.stdout, dtype=np.float32)
    if audio.size == 0:
        return np.zeros((int(duration * sample_rate), channels), dtype=np.float32), sample_rate
    audio = audio.reshape((-1, channels))
    return audio, sample_rate


def crossfade_audio(audio: np.ndarray, sample_rate: int, crossfade_seconds: float) -> np.ndarray:
    fade_samples = max(1, int(round(sample_rate * crossfade_seconds)))
    if audio.shape[0] <= fade_samples * 2:
        raise RuntimeError('Audio clip is too short for the requested crossfade')

    head = audio[:fade_samples]
    tail = audio[-fade_samples:]
    blend = np.linspace(0.0, 1.0, fade_samples, dtype=np.float32)[:, None]
    crossfaded = tail * (1.0 - blend) + head * blend
    return np.concatenate([audio[:-fade_samples], crossfaded], axis=0)


def write_wav(path: Path, audio: np.ndarray, sample_rate: int) -> None:
    clipped = np.clip(audio, -1.0, 1.0)
    pcm = (clipped * 32767.0).astype(np.int16)
    with wave.open(str(path), 'wb') as handle:
        handle.setnchannels(audio.shape[1])
        handle.setsampwidth(2)
        handle.setframerate(sample_rate)
        handle.writeframes(pcm.tobytes())


def build_looped_video(ffmpeg: str, source: Path, audio_wav: Path, crop: tuple[int, int, int, int], duration: float, crossfade: float, output: Path, codec: str) -> None:
    crop_width, crop_height, crop_x, crop_y = crop
    body_duration = max(duration - crossfade, crossfade)

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_dir_path = Path(temp_dir)
        body_path = temp_dir_path / 'body.mp4'
        head_path = temp_dir_path / 'head.mp4'

        segment_filter = (
            f'crop={crop_width}:{crop_height}:{crop_x}:{crop_y},'
            f'scale=768:-2:flags=lanczos,fps=24,format=yuv420p'
        )

        run([
            ffmpeg,
            '-hide_banner',
            '-y',
            '-i', str(source),
            '-t', f'{body_duration:.3f}',
            '-vf', segment_filter,
            '-an',
            '-c:v', 'libx264',
            '-crf', '22',
            '-preset', 'veryfast',
            '-pix_fmt', 'yuv420p',
            str(body_path),
        ])

        run([
            ffmpeg,
            '-hide_banner',
            '-y',
            '-ss', f'{max(duration - crossfade, 0):.3f}',
            '-i', str(source),
            '-t', f'{crossfade:.3f}',
            '-vf', segment_filter,
            '-an',
            '-c:v', 'libx264',
            '-crf', '22',
            '-preset', 'veryfast',
            '-pix_fmt', 'yuv420p',
            str(head_path),
        ])

        final_video_filter = f'[0:v][1:v]xfade=transition=fade:duration={crossfade:.3f}:offset={body_duration - crossfade:.3f}[v]'

        if codec == 'h264':
            video_args = ['-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']
            audio_args = ['-c:a', 'aac', '-b:a', '96k']
        else:
            video_args = ['-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0']
            audio_args = ['-c:a', 'libopus', '-b:a', '80k']

        run([
            ffmpeg,
            '-hide_banner',
            '-y',
            '-i', str(body_path),
            '-i', str(head_path),
            '-i', str(audio_wav),
            '-filter_complex', final_video_filter,
            '-map', '[v]',
            '-map', '2:a:0',
            '-shortest',
            *video_args,
            *audio_args,
            str(output),
        ])


def main() -> int:
    parser = argparse.ArgumentParser(description='Build the looping hero assets from the intro video.')
    parser.add_argument('--input', default='intro.mp4', help='Path to the source intro video.')
    parser.add_argument('--output-dir', default='public', help='Output directory for hero assets.')
    parser.add_argument('--clip-seconds', type=float, default=10.0, help='How much of the intro to keep in the loop.')
    parser.add_argument('--crossfade', type=float, default=0.5, help='Crossfade length at the loop seam.')
    parser.add_argument('--crop', default='', help='Manual crop as width:height:x:y if auto-detection is not enough.')
    args = parser.parse_args()

    source = Path(args.input).resolve()
    output_dir = Path(args.output_dir).resolve()
    hero_dir = output_dir / 'hero'
    hero_dir.mkdir(parents=True, exist_ok=True)

    ffmpeg = get_ffmpeg()
    info = probe_video(ffmpeg, source)
    loop_duration = min(info.duration, args.clip_seconds)
    crossfade = min(args.crossfade, max(loop_duration / 2 - 0.05, 0.1))

    if args.crop:
        crop_parts = [int(part) for part in args.crop.split(':')]
        if len(crop_parts) != 4:
            raise SystemExit('Crop must be width:height:x:y')
        crop = tuple(crop_parts)  # type: ignore[assignment]
    else:
        preview_time = min(0.75, max(loop_duration * 0.1, 0.2))
        preview_frame = extract_frame(ffmpeg, source, preview_time, info.width, info.height)
        crop = estimate_crop(preview_frame, target_ratio=768 / 960)

    print(f'Using crop={crop[0]}:{crop[1]}:{crop[2]}:{crop[3]}')

    frame_times = np.linspace(0.4, max(loop_duration - 0.4, 0.4), num=9).tolist()
    still_frame = pick_sharpest_frame(ffmpeg, source, info, crop, frame_times)

    portrait_crop = crop
    og_crop = fit_crop_to_ratio(crop, still_frame.shape, 1200 / 630)

    portrait_frame = still_frame[portrait_crop[3]:portrait_crop[3] + portrait_crop[1], portrait_crop[2]:portrait_crop[2] + portrait_crop[0]]
    og_frame = still_frame[og_crop[3]:og_crop[3] + og_crop[1], og_crop[2]:og_crop[2] + og_crop[0]]

    encode_still(ffmpeg, portrait_frame, output_dir / 'portrait-bust.webp', (480, 600))
    encode_still(ffmpeg, og_frame, output_dir / 'og.jpg', (1200, 630))

    audio, sample_rate = extract_audio(ffmpeg, source, info, loop_duration)
    looped_audio = crossfade_audio(audio, sample_rate, crossfade)

    with tempfile.TemporaryDirectory() as temp_dir:
        temp_audio = Path(temp_dir) / 'loop.wav'
        write_wav(temp_audio, looped_audio, sample_rate)
        build_looped_video(ffmpeg, source, temp_audio, crop, loop_duration, crossfade, hero_dir / 'hero.mp4', 'h264')
        build_looped_video(ffmpeg, source, temp_audio, crop, loop_duration, crossfade, hero_dir / 'hero.webm', 'vp9')

    print('Hero assets written to public/hero, public/portrait-bust.webp, and public/og.jpg')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())