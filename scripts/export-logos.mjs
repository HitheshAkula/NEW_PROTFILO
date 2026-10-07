import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as icons from 'simple-icons';

const root = dirname(fileURLToPath(import.meta.url));
const outputDir = join(root, '..', 'public', 'logos');

mkdirSync(outputDir, { recursive: true });

const simpleIconMap = {
  python: icons.siPython,
  html5: icons.siHtml5,
  javascript: icons.siJavascript,
  react: icons.siReact,
  nodedotjs: icons.siNodedotjs,
  mongodb: icons.siMongodb,
  github: icons.siGithub,
  coursera: icons.siCoursera,
  hackerrank: icons.siHackerrank,
  streamlit: icons.siStreamlit,
  css3: icons.siCss3,
  linkedin: icons.siLinkedin,
  tableau: icons.siTableau,
  springboard: icons.siSpringboard,
  microsoftsqlserver: icons.siMicrosoftsqlserver,
  informatica: icons.siInformatica,
};

const customIcons = {
  c: { hex: '0d0d0d', title: 'C', path: 'M8 4v16M8 4h7.5M8 20h7.5' },
  css3: { hex: '264de4', title: 'CSS3', path: 'M6 4h12l-1.2 13-4.8 3.2-4.8-3.2L6 4Zm3 4 2.1 11 2.1-11H9Z' },
  microsoftsqlserver: { hex: 'a91d22', title: 'Microsoft SQL Server', path: 'M4 6l8-3 8 3-8 3-8-3Zm0 6 8 3 8-3v6l-8 3-8-3v-6Zm0 6 8 3 8-3v3l-8 3-8-3v-3Z' },
  tableau: { hex: 'e97627', title: 'Tableau', path: 'M11 4h2v4h4v2h-4v4h-2v-4H7V8h4V4Zm-5 8h2v2h2v2H8v2H6v-2H4v-2h2v-2Zm10 0h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2Z' },
  informatica: { hex: '1a1a1a', title: 'Informatica', path: 'M4 8h4v8H4V8Zm6 0h4v8h-4V8Zm6 0h4v8h-4V8Z' },
  linkedin: { hex: '0a66c2', title: 'LinkedIn', path: 'M4 4h16v16H4V4Zm4 6H6v6h2v-6Zm-1-3a1 1 0 1 0 0 .1h.1V7ZM11 10h2v1.1c.3-.6 1-1.3 2.2-1.3 2.1 0 2.8 1.4 2.8 3.3V16h-2v-2.5c0-1.2-.3-2-1.4-2s-1.6.8-1.6 2V16h-2v-6Z' },
  springboard: { hex: '111111', title: 'Springboard', path: 'M6 6h12v2H8v2h10v2H8v2h10v2H6V6Z' },
};

for (const [filename, icon] of Object.entries(simpleIconMap)) {
  if (!icon) continue;
  const svg = icon.svg.replace(/<svg[^>]*>/, `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${icon.hex}">`).replace(/<title>.*?<\/title>/, `<title>${icon.title}</title>`);
  writeFileSync(join(outputDir, `${filename}.svg`), svg);
}

for (const [filename, icon] of Object.entries(customIcons)) {
  const svg = `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${icon.hex}"><title>${icon.title}</title><path d="${icon.path}"/></svg>`;
  writeFileSync(join(outputDir, `${filename}.svg`), svg);
}

writeFileSync(join(outputDir, 'LICENSE.simple-icons.txt'), 'Simple Icons assets are licensed under CC0 1.0 Universal. See https://simpleicons.org for details.');
writeFileSync(join(outputDir, 'LICENSE.custom.txt'), 'Custom SVG icons created for this portfolio project.');
if (simpleIconMap.nodedotjs) {
  writeFileSync(join(outputDir, 'nodejs.svg'), simpleIconMap.nodedotjs.svg.replace(/<svg[^>]*>/, `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#${simpleIconMap.nodedotjs.hex}">`).replace(/<title>.*?<\/title>/, `<title>${simpleIconMap.nodedotjs.title}</title>`));
}

console.log(`Wrote SVG assets to ${outputDir}`);