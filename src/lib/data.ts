export type NavItem = {
  label: string;
  href: string;
};

export type Skill = {
  atomic: number;
  symbol: string;
  name: string;
  family: string;
  kind: 'brand' | 'concept';
  logoKey: string;
  projects: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  uiLabel: string;
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  href?: string;
};

export type EducationEntry = {
  year: string;
  title: string;
  place: string;
  detail: string;
  highlight?: string;
};

export type Achievement = {
  index: string;
  title: string;
  issuer: string;
  caption: string;
  detail: string;
  value: number;
  href?: string;
};

export const PROFILE = {
  name: 'Hithesh Akula',
  role: 'Full Stack Developer',
  email: 'hitheshakula234@gmail.com',
  emailHref: 'mailto:hitheshakula234@gmail.com',
  phone: '+91 9492111977',
  phoneHref: 'tel:+919492111977',
  location: 'Vijayawada, AP',
  resumeSummary: '',
  github: 'https://github.com/HitheshAkula',
  linkedin: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile',
  resumePath: '/resume.pdf',
} as const;

export const NAV: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { title: 'Languages', items: ['Python', 'C', 'HTML', 'CSS', 'JavaScript'] },
  { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'] },
  { title: 'Backend', items: ['Node.js', 'Python'] },
  { title: 'Databases', items: ['MongoDB', 'MS SQL Server'] },
  { title: 'Tools', items: ['Tableau', 'ETL', 'Informatica IDQ', 'GitHub', 'LinkedIn'] },
  { title: 'Concepts', items: ['Problem-Solving', 'Team Player', 'Project Management', 'Adaptability', 'Leadership', 'Quick Learner', 'ML Predictive Analysis'] },
];

export const SKILLS: Skill[] = [
  { atomic: 1, symbol: 'Py', name: 'Python', family: 'Languages', kind: 'brand', logoKey: 'python', projects: ['Forensic Analyzer Tool'] },
  { atomic: 2, symbol: 'C', name: 'C', family: 'Languages', kind: 'brand', logoKey: 'c', projects: ['Forensic Analyzer Tool'] },
  { atomic: 3, symbol: 'HT', name: 'HTML', family: 'Frontend', kind: 'brand', logoKey: 'html5', projects: ['Forensic Analyzer Tool', 'Educational Portal', 'Real-estate Management System'] },
  { atomic: 4, symbol: 'CS', name: 'CSS', family: 'Frontend', kind: 'brand', logoKey: 'css3', projects: ['Forensic Analyzer Tool', 'Educational Portal', 'Real-estate Management System'] },
  { atomic: 5, symbol: 'JS', name: 'JavaScript', family: 'Frontend', kind: 'brand', logoKey: 'javascript', projects: ['Educational Portal', 'Real-estate Management System'] },
  { atomic: 6, symbol: 'Re', name: 'React', family: 'Frontend', kind: 'brand', logoKey: 'react', projects: ['Educational Portal'] },
  { atomic: 7, symbol: 'No', name: 'Node.js', family: 'Backend', kind: 'brand', logoKey: 'nodedotjs', projects: ['Educational Portal'] },
  { atomic: 8, symbol: 'Py', name: 'Pandas', family: 'Backend', kind: 'concept', logoKey: 'pandas', projects: ['Forensic Analyzer Tool'] },
  { atomic: 9, symbol: 'MG', name: 'MongoDB', family: 'Databases', kind: 'brand', logoKey: 'mongodb', projects: ['Educational Portal'] },
  { atomic: 10, symbol: 'SQ', name: 'MS SQL Server', family: 'Databases', kind: 'brand', logoKey: 'microsoftsqlserver', projects: ['Tools/Platforms'] },
  { atomic: 11, symbol: 'TB', name: 'Tableau', family: 'Tools', kind: 'brand', logoKey: 'tableau', projects: ['Tools/Platforms'] },
  { atomic: 12, symbol: 'ET', name: 'ETL', family: 'Tools', kind: 'concept', logoKey: 'etl', projects: ['Tools/Platforms'] },
  { atomic: 13, symbol: 'ID', name: 'Informatica IDQ', family: 'Tools', kind: 'brand', logoKey: 'informatica', projects: ['Tools/Platforms'] },
  { atomic: 14, symbol: 'GH', name: 'GitHub', family: 'Tools', kind: 'brand', logoKey: 'github', projects: ['Forensic Analyzer Tool', 'Educational Portal', 'Real-estate Management System'] },
  { atomic: 15, symbol: 'LI', name: 'LinkedIn', family: 'Tools', kind: 'brand', logoKey: 'linkedin', projects: ['Profile'] },
  { atomic: 16, symbol: 'SP', name: 'Springboard', family: 'Tools', kind: 'brand', logoKey: 'springboard', projects: ['Certifications'] },
  { atomic: 17, symbol: 'CO', name: 'Coursera', family: 'Tools', kind: 'brand', logoKey: 'coursera', projects: ['Certifications'] },
  { atomic: 18, symbol: 'HR', name: 'HackerRank', family: 'Tools', kind: 'brand', logoKey: 'hackerrank', projects: ['Achievements'] },
  { atomic: 19, symbol: 'ST', name: 'Streamlit', family: 'Tools', kind: 'brand', logoKey: 'streamlit', projects: ['Achievements'] },
  { atomic: 20, symbol: 'DS', name: 'Data Parsing', family: 'Concepts', kind: 'concept', logoKey: 'data', projects: ['Forensic Analyzer Tool'] },
  { atomic: 21, symbol: 'PS', name: 'Problem-Solving', family: 'Concepts', kind: 'concept', logoKey: 'problem-solving', projects: ['All Projects'] },
  { atomic: 22, symbol: 'TP', name: 'Team Player', family: 'Concepts', kind: 'concept', logoKey: 'team', projects: ['All Projects'] },
  { atomic: 23, symbol: 'PM', name: 'Project Management', family: 'Concepts', kind: 'concept', logoKey: 'project-management', projects: ['All Projects'] },
  { atomic: 24, symbol: 'AD', name: 'Adaptability', family: 'Concepts', kind: 'concept', logoKey: 'adaptability', projects: ['All Projects'] },
  { atomic: 25, symbol: 'LD', name: 'Leadership', family: 'Concepts', kind: 'concept', logoKey: 'leadership', projects: ['Achievements'] },
  { atomic: 26, symbol: 'QL', name: 'Quick Learner', family: 'Concepts', kind: 'concept', logoKey: 'quick-learner', projects: ['All Projects'] },
  { atomic: 27, symbol: 'ML', name: 'ML Predictive Analysis', family: 'Concepts', kind: 'concept', logoKey: 'ml', projects: ['Forensic Analyzer Tool', 'Achievements'] },
];

export const PROJECTS: Project[] = [
  {
    id: 'forensic-analyzer',
    index: '01',
    title: 'Forensic Analyzer Tool',
    kicker: 'Python · HTML · ML Predictive Analysis · CSS',
    description:
      'Built a digital forensic analysis utility in Python to automate extraction and inspection of metadata from files and system logs.',
    features: [
      'Custom modules for pattern detection, data parsing, and reporting.',
      'Pandas, regex, and file processing modules for diverse data types.',
      'Structured reporting that improves investigation speed.',
      'GitHub repository linked from the résumé.',
    ],
    tech: ['Python', 'HTML', 'CSS', 'ML Predictive Analysis'],
    github: 'https://github.com/HitheshAkula/Foernsic-Analzyer',
    uiLabel: 'Metadata, logs, and structured evidence cards',
  },
  {
    id: 'edu-portal',
    index: '02',
    title: 'Educational Portal (EduProjectPortal)',
    kicker: 'HTML · CSS · JavaScript · Node.js · React',
    description:
      'Designed and implemented a user authentication system with secure login/signup functionality, enabling students and educators to access personalized educational resources and dashboards.',
    features: [
      'Responsive UI components and seamless navigation flows.',
      'Password recovery and session management support.',
      'Front-end architecture prepared for future backend expansion.',
      'GitHub repository linked from the résumé.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'React'],
    github: 'https://github.com/HitheshAkula/Study-planning-Website',
    uiLabel: 'Login flow, dashboard panels, and course cards',
  },
  {
    id: 'real-estate',
    index: '03',
    title: 'Real-estate Management System',
    kicker: 'HTML · CSS · JavaScript',
    description:
      'Developed a responsive Real-Estate Management System using HTML, CSS, and JavaScript to enable users to search, buy, sell, and rent properties without intermediaries.',
    features: [
      'Property listing and filtering by category and price range.',
      'Key details such as area, bedrooms, bathrooms, pricing, and ratings.',
      'Modular sections including Hero, Services, Featured Properties, Contact, and Newsletter.',
      'GitHub repository linked from the résumé.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/HitheshAkula/Realestate-Management-System',
    uiLabel: 'Property cards, filters, and listing modules',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Build Generative AI Apps and Solutions with No-Code Tools',
    issuer: 'Springboard',
    date: 'Aug 2025',
  },
  {
    title: 'Master Generative AI & Generative AI tools (ChatGPT & more)',
    issuer: 'Springboard',
    date: 'Aug 2025',
  },
  {
    title: 'Fundamentals of Network Communication',
    issuer: 'Coursera',
    date: 'Dec 2024',
    href: 'https://coursera.org/verify/UA12SL70WDN0',
  },
  {
    title: 'TCP/IP and Advanced Topics',
    issuer: 'Coursera',
    date: 'Dec 2024',
    href: 'https://coursera.org/verify/4VBHRLGG4YJ4',
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    year: '2025 — Present',
    title: 'Bachelor of Technology, Computer Science and Engineering',
    place: 'Lovely Professional University · Phagwara, Punjab',
    detail: 'CGPA: 7.03',
    highlight: 'Computer Science and Engineering; CGPA: 7.03',
  },
  {
    year: 'Mar 2021 — May 2023',
    title: 'Intermediate',
    place: 'Narayana College · Vijayawada, AP',
    detail: 'PCM; Percentage: 95%',
    highlight: 'PCM; Percentage: 95%',
  },
  {
    year: 'May 2021',
    title: 'Matriculation',
    place: 'S.K.V.H School · Vijayawada, AP',
    detail: 'Percentage: 96%',
    highlight: 'Percentage: 96%',
  },
];

export const EXPERIENCE: EducationEntry[] = [];

export const ACHIEVEMENTS: Achievement[] = [
  {
    index: '01',
    title: 'HackerRank Python (Basic) Certification',
    issuer: 'HackerRank',
    caption: 'Jan 2026',
    detail: 'Demonstrated proficiency in Python fundamentals, including data types, control flow, functions, and problem-solving.',
    value: 26,
  },
  {
    index: '02',
    title: 'HackerRank SQL (Basic) Certification',
    issuer: 'HackerRank',
    caption: 'Jan 2026',
    detail: 'Validated strong understanding of SQL queries, joins, aggregations, filtering, and database fundamentals.',
    value: 26,
  },
  {
    index: '03',
    title: 'Machine Learning Prediction Web App',
    issuer: 'Streamlit',
    caption: 'Dec 2025',
    detail: 'Developed and deployed an interactive Streamlit web application for machine learning-based predictions, covering data preprocessing, model integration, and UI design.',
    value: 25,
  },
  {
    index: '04',
    title: 'Team Leadership & Project Execution',
    issuer: '—',
    caption: 'Jan 2024',
    detail: 'Led a 15-member team to successfully complete a project ahead of schedule by coordinating tasks, resolving blockers, and ensuring timely delivery.',
    value: 15,
  },
];