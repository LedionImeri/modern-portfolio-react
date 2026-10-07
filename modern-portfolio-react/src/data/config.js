/**
 * ════════════════════════════════════════════════════════════════════
 *  CENTRAL CONTENT CONFIGURATION
 *  Everything visible on the site is driven from this file.
 *  Update content here — no component changes needed.
 *
 *  Rules the components follow:
 *   • Empty strings / null / empty arrays are treated as "not available"
 *     and the related button, card or whole section is hidden.
 *   • Icons reference keys in src/assets/icons.js.
 * ════════════════════════════════════════════════════════════════════
 */

/* ── Personal information ─────────────────────────────────────────── */
export const personal = {
  name: 'Ledion Imeri',
  initials: 'LI',
  title: 'Computer Science Student & Software Developer',
  tagline: 'Building modern digital solutions through code, creativity and continuous learning.',
  shortBio:
    'Computer Science student passionate about software development, web technologies and building modern digital solutions.',
  about: [
    'I’m a Computer Science student passionate about software development, web technologies and building modern digital solutions. I completed my Bachelor’s in Professional Programming at AAB College and I’m currently pursuing a Master’s in Computer Science.',
    'My work spans the full development process — from designing relational databases and writing server-side logic in PHP, to building responsive interfaces and practising algorithms and data structures. I also work with Python and Java, and I care about writing code that is clean, tested and easy to maintain.',
  ],
  // Short status shown in the hero. Set to '' to hide.
  availability: 'Open to internships & junior developer roles',
  email: 'ledionimeri25@gmail.com',
  location: '', // e.g. 'Prishtina, Kosovo' — hidden while empty
  cv: {
    // Put the file in /public/cv/ and set e.g. '/cv/Ledion-Imeri-CV.pdf'.
    // While empty, CV buttons turn into "Request CV" (pre-filled email) instead of breaking.
    url: '',
    fileName: 'Ledion-Imeri-CV.pdf',
  },
};

/* ── Social links (empty url → hidden everywhere) ─────────────────── */
export const socials = [
  { id: 'github', label: 'GitHub', handle: 'LedionImeri', url: 'https://github.com/LedionImeri', icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'Ledion Imeri', url: 'https://www.linkedin.com/in/ledion-imeri-072388441/', icon: 'linkedin' },
  { id: 'email', label: 'Email', handle: personal.email, url: `mailto:${personal.email}`, icon: 'mail' },
  // YouTube channel — add the URL when the channel is ready.
  { id: 'youtube', label: 'YouTube', handle: '', url: '', icon: 'youtube' },
];

/* ── Navigation (sections that have no content are skipped automatically) ── */
export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'What I Do' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' }, // appears only when `experience` has entries
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/* ── Skills / tech stack ──────────────────────────────────────────────
 * No percentage bars on purpose: the stack lists what I know or have
 * worked with, without exaggerating proficiency.
 * `color` is the brand tint used for the subtle hover glow.
 */
export const skillGroups = [
  {
    title: 'Languages',
    description: 'General-purpose and server-side programming',
    items: [
      { name: 'Java', icon: 'java', color: '#f89820' },
      { name: 'Python', icon: 'python', color: '#4b8bbe' },
      { name: 'PHP', icon: 'php', color: '#8892bf' },
      { name: 'JavaScript', icon: 'javascript', color: '#f7df1e' },
    ],
  },
  {
    title: 'Web',
    description: 'Interfaces, layouts and front-end frameworks',
    items: [
      { name: 'HTML', icon: 'html', color: '#e34f26' },
      { name: 'CSS', icon: 'css', color: '#663399' },
      { name: 'React', icon: 'react', color: '#61dafb' },
      { name: 'Bootstrap', icon: 'bootstrap', color: '#7952b3' },
    ],
  },
  {
    title: 'Data & Tools',
    description: 'Databases, version control and collaboration',
    items: [
      { name: 'SQL', icon: 'sql', color: '#5eead4' },
      { name: 'Git', icon: 'git', color: '#f05032' },
      { name: 'GitHub', icon: 'github', color: '#e6edf3' },
    ],
  },
];

/* ── What I Do ────────────────────────────────────────────────────── */
export const services = [
  {
    title: 'Software Development',
    icon: 'terminal',
    description: 'Writing structured, maintainable programs in Java, Python and PHP using object-oriented principles.',
  },
  {
    title: 'Web Development',
    icon: 'globe',
    description: 'Building full-stack web applications — server-side logic in PHP and responsive interfaces with HTML, CSS, JavaScript and React.',
  },
  {
    title: 'Database & SQL',
    icon: 'database',
    description: 'Designing relational schemas, writing SQL queries and connecting applications to the database through PDO.',
  },
  {
    title: 'Algorithms & Data Structures',
    icon: 'binary',
    description: 'Solving problems with efficient algorithms and the right data structures, practised regularly on LeetCode.',
  },
  {
    title: 'Software Testing',
    icon: 'flask',
    description: 'Verifying features against requirements and testing edge cases to keep software reliable as it grows.',
  },
];

/* ── Projects ─────────────────────────────────────────────────────────
 * Supported fields per project (all optional except id/title/summary):
 *   featured: boolean          → large layout + "Featured" badge
 *   badge: string              → small label (e.g. 'Diploma project')
 *   summary / description      → short + long text
 *   highlights: string[]       → key features
 *   tech: string[]
 *   links: { github, live, youtube, docs }   → buttons render only when set
 *   images: [{ src, alt }]     → first image is the preview (put files in /public/projects/)
 *   preview: { theme }         → fallback illustrated preview when no image exists
 */
export const projects = [
  {
    id: 'punakosova',
    title: 'PunaKosova',
    featured: true,
    badge: 'Diploma project',
    summary: 'A full-stack platform for searching and publishing job opportunities in Kosovo.',
    description:
      'PunaKosova connects job seekers with employers. Candidates can search listings and apply online, employers publish and manage their job offers, and administrators oversee the platform — each through a dedicated, role-based area.',
    highlights: [
      'Role-based access for candidates, employers and administrators',
      'Job publishing, search and online applications',
      'Saved jobs, notifications and CV uploads',
      'Relational database accessed securely through PDO',
    ],
    tech: ['PHP', 'JavaScript', 'SQL', 'PDO', 'HTML', 'CSS'],
    links: {
      github: '', // add when a public repository exists — the GitHub button appears automatically
      live: '',
      youtube: 'https://youtu.be/WVBBrnxgdB8',
      docs: 'https://drive.google.com/file/d/1CURbMP6DqfPPfsRFl1bUboMrrN28_gn6/view?usp=sharing',
    },
    images: [],
    preview: { theme: 'punakosova' },
  },
];

/* ── Education (newest first) ─────────────────────────────────────── */
export const education = [
  {
    degree: 'Master’s Degree',
    field: 'Computer Science – General',
    institution: 'AAB College',
    status: 'Currently studying',
    current: true,
    period: '', // e.g. '2025 – Present'
    description: '',
  },
  {
    degree: 'Bachelor’s Degree',
    field: 'Computer Science – Professional Programming',
    institution: 'AAB College',
    status: 'Completed',
    current: false,
    period: '',
    description: 'Diploma project: PunaKosova — a full-stack job platform built with PHP and SQL.',
  },
];

/* ── Experience — empty: the section and nav item stay hidden ─────────
 * Example entry:
 * {
 *   role: 'Software Development Intern',
 *   company: 'Company name',
 *   companyUrl: 'https://…',
 *   type: 'Internship',              // Internship | Full-time | Part-time | Freelance
 *   period: 'Jun 2027 – Sep 2027',
 *   location: 'Prishtina, Kosovo',
 *   description: 'What you worked on.',
 *   highlights: ['…'],
 *   tech: ['PHP', 'MySQL'],
 * }
 */
export const experience = [];

/* ── Certifications — hidden while empty ──────────────────────────────
 * { title, issuer, date, url, credentialId }
 */
export const certifications = [];

/* ── Achievements — hidden while empty ── { title, date, description, url } */
export const achievements = [];

/* ── Blog / articles — hidden while empty ── { title, date, description, url } */
export const articles = [];

/* ── LeetCode / coding practice ───────────────────────────────────────
 * Fill `stats` manually (numbers) or set VITE_LEETCODE_STATS_ENDPOINT
 * (see README). Any stat left as null is simply not shown.
 */
export const leetcode = {
  username: '',
  profileUrl: '', // e.g. 'https://leetcode.com/u/<username>/'
  intro:
    'I practise programming through LeetCode coding challenges to sharpen my problem-solving and deepen my understanding of algorithms and data structures.',
  focusAreas: ['Algorithms', 'Data Structures', 'Problem Solving', 'Time & Space Complexity'],
  stats: {
    solved: null,
    easy: null,
    medium: null,
    hard: null,
    studyPlans: null,
  },
};

/* ── Closing call to action ───────────────────────────────────────── */
export const cta = {
  title: 'Let’s build something great together.',
  text: 'I’m looking for internships and junior developer opportunities where I can contribute, learn from experienced engineers and grow as a software developer.',
  button: 'Get in Touch',
};
