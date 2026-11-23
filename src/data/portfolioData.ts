export type ProjectCategory = 'All' | 'Full-Stack' | 'AI / Hackathon' | 'Mobile' | 'IoT';

export interface LogoVariant {
  src: string;
  bg: string;
  label: string;
  dark?: boolean;
  fullBleed?: boolean;
}

export interface CaseStudyData {
  projectType: string;
  role: string;
  team: string;
  spotlight?: {
    label: string;
    title: string;
    detail: string;
  };
  kpis: { value: string; label: string }[];
  problem: string;
  solution: string;
  design: {
    systemNote: string;
    palette: { name: string; hex: string }[];
    uxDecisions: { title: string; detail: string }[];
    uiSlots: { title: string; caption: string; device: 'desktop' | 'mobile'; image?: string }[];
  };
  engineering: {
    architectureFlow: { layer: string; step: string; detail: string }[];
    stackGroups: { label: string; items: string[] }[];
    highlights: { title: string; detail: string }[];
  };
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
  caseStudy?: CaseStudyData;
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
  images?: { src: string; label: string }[];
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
    caseStudy: {
      projectType: 'LGU Capstone Project',
      role: 'Lead Full-Stack Developer',
      team: 'BSIT Capstone Team · NBSC',
      spotlight: {
        label: 'Real Government Client · Capstone Validation',
        title: 'Municipal Nutrition Action Office (MNAO) — Manolo Fortich, Bukidnon',
        detail:
          'Evaluated live via System Usability Scale (SUS) with 10 LGU stakeholders (7 MNAO staff + 3 MISO IT experts), earning 75.50 overall ("Good") and 77.86 among daily MNAO client users.',
      },
      kpis: [
        { value: '14', label: 'PostgreSQL Tables' },
        { value: '75.50', label: 'Overall SUS Score' },
        { value: '77.86', label: 'Client Staff SUS' },
        { value: '4.40/5', label: 'Utility Rating' },
      ],
      problem:
        'MNAO Manolo Fortich managed nutrition commodities, Human Milk Bank inventory, barangay releases, and expiry monitoring entirely through manual paper logbooks—causing slow reporting, transcription errors, and risk of stock expiration.',
      solution:
        'Built a unified web-based Nutrition Commodity Inventory & Decision Support System featuring OCR label scanning for rapid intake, automated FEFO (First-Expired, First-Out) alerts, defect/quarantine tracking, and one-click PDF/Excel/CSV reporting.',
      design: {
        systemNote:
          'High-clarity operational dashboard designed for non-technical LGU staff: high-contrast status badges for expiry urgency, scannable tables, and guided batch intake workflows.',
        palette: [
          { name: 'Nutri Green', hex: '#16A34A' },
          { name: 'Alert Orange', hex: '#F97316' },
          { name: 'Surface White', hex: '#FFFFFF' },
          { name: 'Ink Slate', hex: '#111827' },
        ],
        uxDecisions: [
          {
            title: 'FEFO Visual Urgency',
            detail: 'Color-coded batch expiry tiers surface near-expiring commodities immediately before releases.',
          },
          {
            title: 'Semi-Automated OCR Intake',
            detail: 'Staff snap commodity labels to pre-fill batch numbers & expiry dates with quick manual override.',
          },
          {
            title: 'Zero-Training Learnability',
            detail: 'Scored 4.30/5.00 ease of use and 4.10/5.00 learnability among MNAO staff with minimal onboarding.',
          },
        ],
        uiSlots: [
          {
            title: 'Inventory & FEFO Dashboard',
            caption: 'Real-time commodity levels, expiry risk alerts, and quick stock actions.',
            device: 'desktop',
          },
          {
            title: 'OCR Label Scanner & Batch Intake',
            caption: 'Camera/image OCR extraction for batch codes and expiration dates.',
            device: 'desktop',
          },
          {
            title: 'Barangay Distribution & Reports',
            caption: 'Bulk release logging with automated PDF, Excel, and CSV export history.',
            device: 'desktop',
          },
        ],
      },
      engineering: {
        architectureFlow: [
          { layer: 'Frontend', step: 'React + Vite UI', detail: 'Modular inventory, milk bank, releases, and reporting views.' },
          { layer: 'Capture', step: 'OCR Service', detail: 'Extracts batch & expiry strings from physical nutrition labels.' },
          { layer: 'Database', step: 'Supabase PostgreSQL', detail: '14 normalized relational tables across 3 functional subsystems.' },
          { layer: 'Output', step: 'FEFO + Exports', detail: 'Automated expiry sorting & instant PDF/Excel/CSV audit reports.' },
        ],
        stackGroups: [
          { label: 'Frontend', items: ['React', 'Vite', 'TypeScript', 'CSS3'] },
          { label: 'Backend & OCR', items: ['Python', 'FastAPI', 'OCR Integration', 'REST API'] },
          { label: 'Database & Auth', items: ['Supabase', 'PostgreSQL', '14-Table ERD', 'Role Governance'] },
          { label: 'Reporting', items: ['PDF Export', 'Excel / CSV', 'FEFO Logic'] },
        ],
        highlights: [
          {
            title: '14-Table Relational Architecture',
            detail: 'Separated Inventory & Stock Disposition, Human Milk Bank, and Auth/Governance subsystems with strict FK integrity.',
          },
          {
            title: 'Audit Trail & Soft Voiding',
            detail: 'Tracks created_by, updated_by, voided_by, defect incidents, and restoration logs for government accountability.',
          },
          {
            title: 'One-Click Audit Exports',
            detail: 'Replaced hours of manual spreadsheet computation with deterministic PDF, Excel, and CSV downloads.',
          },
        ],
      },
    },
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
    caseStudy: {
      projectType: 'Competition Buildathon',
      role: 'Full-Stack & Product Engineer',
      team: 'Team Token Maxxers',
      spotlight: {
        label: 'Competition Recognition · GDG Cagayan de Oro',
        title: 'Champion (Bukidnon Semi-Finals) & Top 5 Regional Finalist — DevFest CDO 2026',
        detail:
          'Won 1st Place in the Bukidnon provincial qualifier (Nov 7, 2026) and pitched live on stage at Cinema 1, Limketkai Center (Nov 21, 2026) as one of 5 Northern Mindanao finalists.',
      },
      kpis: [
        { value: '1st', label: 'Bukidnon Semi-Finals' },
        { value: 'Top 5', label: 'Northern Mindanao' },
        { value: 'AI', label: 'Gemini Time-Blocking' },
        { value: 'Live', label: 'Stage Judge Demo' },
      ],
      problem:
        'Students and knowledge workers abandon traditional to-do apps because static lists create decision fatigue—leaving users overwhelmed about what to do next and how long tasks actually take.',
      solution:
        'Designed and shipped CereBruv, an AI-assisted productivity & time-blocking web app that turns messy brain-dumps into structured, realistic focus blocks backed by primary user survey research.',
      design: {
        systemNote:
          'Playful yet disciplined crimson-and-monochrome interface with an expressive brain mascot, zero-clutter daily timeline, and thumb-friendly mobile interactions.',
        palette: [
          { name: 'CereBruv Red', hex: '#E11D48' },
          { name: 'Carbon Black', hex: '#111111' },
          { name: 'Clean Canvas', hex: '#FAFAFA' },
          { name: 'Muted Slate', hex: '#71717A' },
        ],
        uxDecisions: [
          {
            title: 'Frictionless Brain-Dump Input',
            detail: 'Users type raw thoughts instead of filling 6 form fields; AI parses priority and duration automatically.',
          },
          {
            title: 'Visual Time-Block Clarity',
            detail: 'Replaced endless checkboxes with scannable time slots so users see their exact day at a glance.',
          },
          {
            title: 'Survey-Validated Flows',
            detail: 'Iterated core screens directly from student survey responses before the regional finals pitch.',
          },
        ],
        uiSlots: [
          {
            title: 'AI Daily Planner & Time-Blocking',
            caption: 'Structured focus timeline generated from natural-language tasks.',
            device: 'mobile',
          },
          {
            title: 'Task Breakdown & Mind Graph',
            caption: 'Visual priority mapping and smart scheduling suggestions.',
            device: 'mobile',
          },
          {
            title: 'Focus Mode & Progress Summary',
            caption: 'Distraction-free timer with daily completion metrics.',
            device: 'mobile',
          },
        ],
      },
      engineering: {
        architectureFlow: [
          { layer: 'Client', step: 'React + TypeScript', detail: 'Responsive mobile-first PWA interface built with Vite.' },
          { layer: 'AI Layer', step: 'Gemini AI API', detail: 'Structured prompting to parse tasks into actionable time blocks.' },
          { layer: 'Server', step: 'Node.js / Express', detail: 'Handles prompt orchestration, validation, and rate limits.' },
          { layer: 'Sync', step: 'Realtime State', detail: 'Fast local-first updates synced cleanly with cloud storage.' },
        ],
        stackGroups: [
          { label: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Responsive PWA'] },
          { label: 'AI & Prompts', items: ['Gemini AI', 'Structured JSON Output', 'Prompt Engineering'] },
          { label: 'Backend', items: ['Node.js', 'Express', 'REST APIs'] },
          { label: 'Validation', items: ['User Survey Research', 'Live Stage Demo'] },
        ],
        highlights: [
          {
            title: 'Deterministic AI Scheduling',
            detail: 'Constrained Gemini outputs into structured schedule blocks with fallback handling for quota limits.',
          },
          {
            title: 'Rapid Hackathon Execution',
            detail: 'Went from user survey validation to live deployed product demo across provincial qualifiers and regional finals.',
          },
          {
            title: 'Mobile-First Performance',
            detail: 'Lightweight Vite bundle tuned for smooth transitions during live stage presentations.',
          },
        ],
      },
    },
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
    caseStudy: {
      projectType: 'Flagship Full-Stack PWA',
      role: 'Creator & Full-Stack Engineer',
      team: 'Solo / Indie Product Build',
      spotlight: {
        label: 'Production Deployed PWA',
        title: 'Live Installable Mobile Web App on Vercel',
        detail:
          'Built end-to-end with 700KB+ of modular TypeScript and 22KB of PostgreSQL PL/pgSQL functions—delivering native-feeling duo study rooms directly in the browser.',
      },
      kpis: [
        { value: 'PWA', label: 'Installable Mobile App' },
        { value: '707 KB', label: 'TypeScript Codebase' },
        { value: 'PL/pgSQL', label: 'Supabase RPC Logic' },
        { value: 'Leaflet', label: 'Live Map Discovery' },
      ],
      problem:
        'Solo studying leads to procrastination and burnout, yet existing study tools are either lonely timers or cluttered Discord servers with zero structured accountability.',
      solution:
        'Created Beside—a warm, mascot-driven Progressive Web App pairing learners into gamified duo focus sessions with onboarding matchmaking, map discovery, and study history analytics.',
      design: {
        systemNote:
          'Cozy coffee-and-cream palette anchored by an expressive 3D otter mascot that reacts to study states, making accountability feel friendly rather than stressful.',
        palette: [
          { name: 'Espresso Brown', hex: '#7E4228' },
          { name: 'Warm Cream', hex: '#F1F1F1' },
          { name: 'Card White', hex: '#FFFFFF' },
          { name: 'Deep Ink', hex: '#1F2937' },
        ],
        uxDecisions: [
          {
            title: 'Emotional Mascot Feedback',
            detail: 'Expressive otter companion guides onboarding, focus sessions, and streak milestones.',
          },
          {
            title: 'Portrait-First Mobile Ergonomics',
            detail: 'Bottom-reachable navigation and clean card hierarchy built specifically for one-handed phone use.',
          },
          {
            title: 'Low-Friction Duo Matching',
            detail: 'Streamlined onboarding pairs students by subject and schedule in under a minute.',
          },
        ],
        uiSlots: [
          {
            title: 'Home & Duo Focus Room',
            caption: 'Live collaborative study timer with partner presence and session status.',
            device: 'mobile',
          },
          {
            title: 'Connections & Map Discovery',
            caption: 'Interactive Leaflet map and peer matchmaking directory.',
            device: 'mobile',
          },
          {
            title: 'Study History & Profile Analytics',
            caption: 'Visualized session streaks, focus hours, and personal milestones.',
            device: 'mobile',
          },
        ],
      },
      engineering: {
        architectureFlow: [
          { layer: 'Client', step: 'React + Zustand', detail: 'Modular feature slices with predictable global state.' },
          { layer: 'Maps', step: 'React-Leaflet', detail: 'Lightweight interactive map rendering for peer discovery.' },
          { layer: 'Backend', step: 'Supabase + PL/pgSQL', detail: 'Auth, relational tables, and custom database functions.' },
          { layer: 'Delivery', step: 'Vercel PWA', detail: 'Manifest-configured standalone app with instant CDN edge delivery.' },
        ],
        stackGroups: [
          { label: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'React Router', 'Lucide'] },
          { label: 'State & Geo', items: ['Zustand', 'Leaflet', 'React-Leaflet', 'date-fns'] },
          { label: 'Backend & DB', items: ['Supabase', 'PostgreSQL', 'PL/pgSQL', 'Auth'] },
          { label: 'Deployment', items: ['Vercel', 'PWA Manifest', 'Mobile-First'] },
        ],
        highlights: [
          {
            title: 'Clean Modular Architecture',
            detail: 'Organized into dedicated modules, services, stores, types, and shared UI primitives for maintainability.',
          },
          {
            title: 'Database-Level Business Logic',
            detail: 'Offloaded critical matchmaking and study-log integrity rules into PostgreSQL PL/pgSQL functions.',
          },
          {
            title: 'Standalone PWA Experience',
            detail: 'Configured full maskable icon sets and standalone viewport rules for iOS/Android home screens.',
          },
        ],
      },
    },
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
      { src: '/assets/logo-kablehero.png', bg: '#FFFFFF', label: 'Original' },
      { src: '/assets/logo-kablehero-alt.png', bg: '#FFFFFF', label: 'Inverted' },
    ],
    caseStudy: {
      projectType: 'Civic Tech Competition Build',
      role: 'Full-Stack & Mobile PWA Developer',
      team: 'Team Token Maxxers',
      spotlight: {
        label: 'Civic Safety & Dispatch Innovation',
        title: 'Crowdsourced Electric Hazard Triage for Philippine Cooperatives & Barangays',
        detail:
          'Designed to solve post-typhoon reporting chaos—turning vague hotline calls into GPS-pinned, photo-backed, community-verified hazard tickets in 3 taps behind a safe-distance gate.',
      },
      kpis: [
        { value: '3 Taps', label: 'Hazard Ticket Flow' },
        { value: '372 KB', label: 'TypeScript App' },
        { value: 'Realtime', label: 'Triage Map Sync' },
        { value: '3 Tiers', label: 'Civic XP Progression' },
      ],
      problem:
        'After typhoons and road accidents in the Philippines, downed power poles and live wires get reported through congested hotlines or social posts with no GPS coordinates and no visual proof—delaying emergency dispatch.',
      solution:
        'Built KableHero Lite, a mobile-first civic PWA combining 3-tap GPS + photo reporting, a mandatory safe-distance hold gate, a live color-coded triage map with community verification, and gamified civic tiers.',
      design: {
        systemNote:
          'High-visibility safety-amber and stark black industrial palette engineered for outdoor sunlight legibility and stress-free emergency tapping.',
        palette: [
          { name: 'Hazard Amber', hex: '#D97706' },
          { name: 'Line Black', hex: '#111111' },
          { name: 'Safety White', hex: '#FFFFFF' },
          { name: 'Urgent Red', hex: '#DC2626' },
        ],
        uxDecisions: [
          {
            title: '3-Tap Emergency Flow',
            detail: 'Large touch targets let stressed residents capture GPS, photo, and hazard severity in seconds.',
          },
          {
            title: 'Safe-Distance Hold Gate',
            detail: 'Intentional press-and-hold safety confirmation reminds citizens to stay clear of live wires before submitting.',
          },
          {
            title: 'Gamified Civic Stewardship',
            detail: 'XP tiers (Purok Scout → Tanod Specialist → Master Lineman) reward accurate community hazard verification.',
          },
        ],
        uiSlots: [
          {
            title: '3-Tap Hazard Reporter & Safety Gate',
            caption: 'GPS lock, photo capture, 3-tier severity picker, and safe-distance hold button.',
            device: 'mobile',
          },
          {
            title: 'Realtime Dispatch Triage Map',
            caption: 'Color-coded hazard pins, community verification counts, and live crew status.',
            device: 'mobile',
          },
          {
            title: 'Civic Profile & XP Progression',
            caption: 'Reporter history, verified badges, and Purok Scout → Master Lineman tiers.',
            device: 'mobile',
          },
        ],
      },
      engineering: {
        architectureFlow: [
          { layer: 'Reporter', step: 'Mobile PWA + GPS', detail: 'Captures browser geolocation, compressed photo, and severity tier.' },
          { layer: 'Backend', step: 'Supabase + PL/pgSQL', detail: 'Persists tickets, verification votes, and XP tier calculations.' },
          { layer: 'Realtime', step: 'Live Triage Map', detail: 'Streams color-coded pin updates and dispatcher status changes.' },
          { layer: 'Auth', step: 'Email & Google Auth', detail: 'Accountable reporting linked to citizen profiles and audit logs.' },
        ],
        stackGroups: [
          { label: 'Frontend', items: ['React', 'TypeScript', 'Radix UI', 'Mobile PWA'] },
          { label: 'Backend & DB', items: ['Supabase', 'PostgreSQL', 'PL/pgSQL', 'Realtime'] },
          { label: 'Geo & Media', items: ['Geolocation API', 'Photo Upload', 'Triage Map'] },
          { label: 'Auth & Security', items: ['Google Sign-In', 'Email Auth', 'Safe-Distance Gate'] },
        ],
        highlights: [
          {
            title: 'Community Deduplication & Voting',
            detail: 'Verification counts allow dispatchers to prioritize confirmed high-risk live-wire incidents first.',
          },
          {
            title: 'Accessible Radix UI Primitives',
            detail: 'Built dialogs, alerts, and severity controls with keyboard- and screen-reader-safe Radix components.',
          },
          {
            title: '20KB PL/pgSQL Workflow Layer',
            detail: 'Encapsulated XP scoring, ticket state transitions, and civic rank upgrades cleanly in PostgreSQL.',
          },
        ],
      },
    },
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
    id: 'gdg-devfest-main-2026',
    title: 'DevFest Cagayan de Oro 2026',
    issuer: 'Google Developer Group (GDG) CDO',
    date: 'Nov 21, 2026',
    image: '/assets/cert-devfest-main.jpg',
    skills: ['Google Tech', 'Agentic AI', 'DevFest'],
  },
  {
    id: 'gdg-devfest-roadshow-2026',
    title: 'DevFest 2026 Buildathon Roadshow: Bukidnon Stop',
    issuer: 'Google Developer Group (GDG) CDO',
    date: 'Nov 7, 2026',
    image: '/assets/cert-devfest-roadshow.jpg',
    skills: ['Buildathon', 'Agentic AI', 'NBSC'],
  },
  {
    id: 'leb-data',
    title: 'Results & Data Interpretation',
    issuer: 'London Examinations Board',
    date: 'Oct 2026',
    image: '/assets/cert-leb-data.jpg',
    skills: ['Data Analysis', 'Research', 'Interpretation'],
  },
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
    id: 'cisco-prompt',
    title: 'Prompt Like an Engineer',
    issuer: 'Cisco Networking Academy · DICT-ITU',
    date: 'Sep 2026',
    images: [
      { src: '/assets/cert-cisco-prompt-1.jpg', label: 'Certificate 1/2' },
      { src: '/assets/cert-cisco-prompt-2.jpg', label: 'Details 2/2' },
    ],
    skills: ['Prompt Engineering', 'LLMs', 'AI Evaluation'],
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
  {
    id: 'nbsc-sql-2026',
    title: 'SQL Query Challenge (IT FEST 2026)',
    issuer: 'NBSC — Institute for Computer Studies',
    date: 'Apr 15, 2026',
    image: '/assets/cert-sql-challenge.jpg',
    skills: ['SQL', 'Database Querying', 'Competition'],
  },
  {
    id: 'ibm-cyber',
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Jan 2025',
    verifyUrl: 'https://www.credly.com/go/8NaMH3gM',
    image: '/assets/cert-ibm-cybersecurity.png',
    skills: ['Cybersecurity', 'Cryptography', 'Threat Defense'],
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
