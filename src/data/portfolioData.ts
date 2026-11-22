export type ProjectCategory = 'All' | 'Full-Stack' | 'AI / Hackathon' | 'Mobile' | 'IoT';

export interface LogoVariant {
  src: string;
  bg: string;
  label: string;
  dark?: boolean;
  fullBleed?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  badge?: string;
  metrics?: string[];
  description: string;
  highlights: string[];
  stack: string[];
  liveUrl?: string;
  githubUrl?: string;
  accentBg: string;
  logoVariants?: LogoVariant[];
}

export interface AwardItem {
  id: string;
  rank: string;
  title: string;
  issuer: string;
  date: string;
  summary: string;
  image?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyUrl?: string;
  image?: string;
  skills: string[];
}

export const PROFILE = {
  name: 'Adrian Villarosa',
  role: 'Software Engineer',
  subrole: 'Full-Stack Web, Mobile & AI Builder',
  location: 'Bukidnon, Philippines',
  email: 'drianv5335@gmail.com',
  phone: '+63 928 861 7200',
  github: 'https://github.com/DRN-X2',
  linkedin: 'https://www.linkedin.com/in/adrian-villarosa-276174416/',
  resumePdf: '/Adrian_Villarosa_Resume.pdf',
  photo: '/assets/adrian-photo.jpg',
};

export const MASCOT_FACTS = [
  'Ships full-stack apps with React, TypeScript & Supabase.',
  'Built a 14-table LGU inventory system rated 75.50 SUS.',
  'DevFest CDO 2026 Bukidnon Leg Champion (Team Token Maxxers)!',
  'Top 5 Regional Finalist across Northern Mindanao.',
  'Won 1st Place in PromptPulse: AI Engineering (BUKCODENON 2).',
  'Codes everything from web PWAs to Arduino obstacle robots.',
  'Currently open for Software Engineer roles — let’s build!',
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'nutrivision',
    title: 'NutriVision',
    tagline: 'LGU Nutrition Commodity Inventory & Decision Support System',
    category: 'Full-Stack',
    year: '2026',
    badge: 'LGU Capstone · 75.50 SUS',
    metrics: ['14 PostgreSQL Tables', '75.50 Overall SUS', '77.86 Client Score', '10 LGU Evaluators'],
    description:
      'Production web platform built for the Municipal Nutrition Action Office (MNAO) of Manolo Fortich, Bukidnon, replacing manual paper workflows with OCR-assisted batch intake, FEFO expiry tracking, and instant reporting.',
    highlights: [
      'Architected a 14-table Supabase PostgreSQL schema covering Inventory, Human Milk Bank, Barangay Distributions, Defect/Quarantine, and role-based governance.',
      'Integrated OCR label scanning to capture batch numbers and expiration dates with minimal manual typing.',
      'Automated FEFO (First-Expired, First-Out) alerts and one-click PDF, Excel, and CSV report generation.',
      'Validated with 7 MNAO staff and 3 MISO IT experts (4.40/5.00 utility, 4.30/5.00 ease of use).',
    ],
    stack: ['React', 'Vite', 'Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'OCR'],
    githubUrl: 'https://github.com/Vision-Enterprise/nutriVision-version-1',
    accentBg: '#FFF4ED',
    logoVariants: [
      { src: '/assets/logo-nutrivision.png', bg: '#FFFFFF', label: 'Light' },
      { src: '/assets/logo-nutrivision.png', bg: '#111111', label: 'Dark', dark: true },
    ],
  },
  {
    id: 'cerebruv',
    title: 'CereBruv',
    tagline: 'AI-Powered Personal Productivity & Time-Blocking Web App',
    category: 'AI / Hackathon',
    year: 'Nov 2026',
    badge: '1st Bukidnon · Top 5 Regional',
    metrics: ['Bukidnon Champion', 'Top 5 Northern Mindanao', 'Live Judge Demo'],
    description:
      'Built and pitched with Team Token Maxxers for the DevFest Cagayan de Oro 2026 Buildathon. Combines AI task structuring with adaptive time-blocking backed by real user survey validation.',
    highlights: [
      'Won 1st Place at the DevFest CDO 2026 Bukidnon Semi-Finals to represent Bukidnon at the Main Event.',
      'Selected as 1 of 5 Regional Finalists across Northern Mindanao and demoed live at Cinema 1, Limketkai Center.',
      'Defended technical architecture, survey findings, and product viability before industry judges.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Gemini AI', 'Node.js'],
    githubUrl: 'https://github.com/token-maxxers/CereBruv',
    accentBg: '#FEF2F2',
    logoVariants: [
      { src: '/assets/logo-cerebruv-red.png', bg: '#FFFFFF', label: 'Red' },
      { src: '/assets/logo-cerebruv-white.png', bg: '#111111', label: 'Dark', dark: true },
      { src: '/assets/logo-cerebruv-black.png', bg: '#F4F4F5', label: 'Mono' },
    ],
  },
  {
    id: 'beside',
    title: 'Beside',
    tagline: 'Gamified Peer Study Matchmaking & Collaborative Focus PWA',
    category: 'Full-Stack',
    year: 'Oct 2026',
    badge: 'Live PWA',
    metrics: ['Installable PWA', 'Realtime State', 'Vercel Production'],
    description:
      '"No one should have to learn alone." Full-stack Progressive Web App connecting students for duo study sessions, focus tracking, study history analytics, and location-aware discovery.',
    highlights: [
      'Engineered auth, onboarding, connections, duo focus rooms, and study history analytics.',
      'Built scalable client state with Zustand and PostgreSQL/PLpgSQL backend workflows on Supabase.',
      'Integrated interactive Leaflet maps and deployed as a fast mobile-installable PWA on Vercel.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Zustand', 'Supabase', 'PL/pgSQL', 'Leaflet'],
    liveUrl: 'https://beside-app-flame.vercel.app',
    githubUrl: 'https://github.com/DRN-X2/beside-app',
    accentBg: '#F3F4F6',
    logoVariants: [
      { src: '/assets/logo-beside-happy.jpg', bg: '#7E4228', label: 'Happy', dark: true, fullBleed: true },
      { src: '/assets/logo-beside-think.jpg', bg: '#7E4228', label: 'Thinking', dark: true, fullBleed: true },
    ],
  },
  {
    id: 'aegis',
    title: 'Project Aegis',
    tagline: 'Privacy-First Anonymous Student Mental Health Mobile App',
    category: 'Mobile',
    year: 'Apr 2026',
    badge: 'Privacy-First Mobile',
    metrics: ['Ghost Profile Auth', 'Supabase RLS', 'Low-Bandwidth'],
    description:
      'Cross-platform mobile counseling system for Northern Bukidnon State College students enabling anonymous, secure, low-bandwidth communication between students and campus counselors.',
    highlights: [
      'Implemented pseudonymous Ghost Profile registration, deterministic alias generation, and SHA-256 hashing.',
      'Built realtime student-counselor chat, mood logging, CBT self-help toolkit, and SOS event logging.',
      'Protected sensitive records using Supabase Row-Level Security (RLS) policies.',
    ],
    stack: ['Ionic React', 'TypeScript', 'Capacitor', 'Supabase', 'Realtime', 'RLS'],
    githubUrl: 'https://github.com/DRN-X2/Aegis',
    accentBg: '#EFF6FF',
  },
  {
    id: 'kablehero',
    title: 'KableHero Lite',
    tagline: 'Crowdsourced Electric Hazard Reporting & Dispatch Triage PWA',
    category: 'Full-Stack',
    year: 'Sep 2026',
    badge: 'Civic Tech PWA',
    metrics: ['3-Tap Hazard Report', 'Realtime Triage Map', 'Safe-Distance Gate'],
    description:
      'Mobile-first PWA built with Team Token Maxxers for Philippine electric cooperatives, barangays, and residents—turning downed-pole and live-wire reports into GPS-pinned, photo-backed, community-verified dispatch tickets.',
    highlights: [
      'Engineered 3-tap reporter flow with GPS coordinates, photo capture, 3-tier hazard severity, and a safe-distance hold gate.',
      'Built realtime triage map with color-coded hazard pins, community verification voting, and live dispatcher status updates.',
      'Implemented gamified civic XP progression (Purok Scout → Tanod Specialist → Master Lineman) backed by Supabase & PL/pgSQL.',
    ],
    stack: ['React', 'TypeScript', 'Supabase', 'PL/pgSQL', 'Radix UI', 'PWA'],
    githubUrl: 'https://github.com/token-maxxers/KableHero_Lite',
    accentBg: '#FEFCE8',
    logoVariants: [
      { src: '/assets/logo-kablehero.png', bg: '#FFFFFF', label: 'Light' },
      { src: '/assets/logo-kablehero.png', bg: '#FEF3C7', label: 'Amber' },
    ],
  },
  {
    id: 'arduino-robot',
    title: 'Autonomous Line & Obstacle Robot',
    tagline: 'Sensor-Driven Arduino Robot with Servo Ultrasonic Scanning',
    category: 'IoT',
    year: 'Mar 2026',
    badge: 'Embedded C++ / IoT',
    metrics: ['3x IR Sensors', 'Ultrasonic Scan', 'Autonomous Nav'],
    description:
      'Autonomous embedded robotics system that tracks a line using triple infrared sensors while continuously scanning ahead with a servo-mounted ultrasonic sensor to route around obstacles.',
    highlights: [
      'Programmed real-time motor control loop in C++ on Arduino with motor driver shield.',
      'Implemented dynamic left/right servo sweep to pick the clearest bypass path automatically.',
    ],
    stack: ['C++', 'Arduino', 'IR Sensors', 'Ultrasonic Sensor', 'Servo Control'],
    githubUrl: 'https://github.com/DRN-X2/arduino-line-follower-obstacle-robot',
    accentBg: '#FFFBEB',
  },
];

export const AWARDS: AwardItem[] = [
  {
    id: 'devfest-champ',
    rank: '1st Place · Champion',
    title: 'DevFest CDO 2026 Buildathon — Bukidnon Leg Semi-Finals',
    issuer: 'Google Developer Group (GDG) Cagayan de Oro',
    date: 'Nov 2026',
    summary:
      'Placed 1st in the Bukidnon provincial qualifier with Team Token Maxxers, building and pitching CereBruv to earn the slot representing Bukidnon at the Main Event.',
    image: '/assets/award-devfest-champion.jpg?v=2',
  },
  {
    id: 'devfest-finalist',
    rank: 'Top 5 Regional Finalist',
    title: 'DevFest Cagayan de Oro 2026 Buildathon Finals',
    issuer: 'Google Developer Group (GDG) Cagayan de Oro',
    date: 'Nov 2026',
    summary:
      'Selected as one of five regional finalists across Northern Mindanao. Demoed CereBruv live at Cinema 1, Limketkai Center, defending architecture and user validation.',
    image: '/assets/award-devfest-finalist.jpg?v=2',
  },
  {
    id: 'promptpulse',
    rank: '1st Place · Champion',
    title: 'PromptPulse: AI Engineering (BUKCODENON 2: Tech Arena)',
    issuer: 'DEVCON Bukidnon',
    date: 'Sep 2026',
    summary:
      'Won Champion plaque and medal in the AI Engineering category at the inter-campus technology competition hosted at Northern Bukidnon State College.',
    image: '/assets/award-promptpulse.jpg?v=2',
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'google-python',
    title: 'Crash Course on Python',
    issuer: 'Google (Coursera)',
    date: 'Sep 2026',
    verifyUrl: 'https://coursera.org/verify/IZXFMY12TYPQ',
    image: '/assets/cert-google-python.jpg?v=2',
    skills: ['Python', 'Data Structures', 'Automation'],
  },
  {
    id: 'google-pm',
    title: 'Foundations of Project Management',
    issuer: 'Google (Coursera)',
    date: 'Aug 2026',
    verifyUrl: 'https://coursera.org/verify/MY08DFWHHAM5',
    image: '/assets/cert-google-pm.jpg?v=2',
    skills: ['Agile', 'Project Lifecycle', 'Leadership'],
  },
];

export const SKILL_GROUPS = [
  {
    label: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'SQL / PLpgSQL', 'PHP', 'Java', 'C++', 'Move', 'HTML5 / CSS3'],
  },
  {
    label: 'Frontend & Mobile',
    items: ['React', 'Ionic React', 'Capacitor', 'Vite', 'Zustand', 'Leaflet', 'PWA', 'Figma'],
  },
  {
    label: 'Backend & Data',
    items: ['Supabase', 'PostgreSQL', 'Node.js', 'Express', 'FastAPI', 'MySQL', 'MariaDB', 'Firebase', 'REST APIs'],
  },
  {
    label: 'AI, Cloud & Hardware',
    items: ['Gemini AI', 'OCR Integration', 'Git & GitHub', 'Vercel', 'Arduino', 'ESP32 (IoT)', 'Agile / Scrum'],
  },
];
