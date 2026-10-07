import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Cursor from './components/Cursor.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import WhatIDo from './sections/WhatIDo.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import LeetCode from './sections/LeetCode.jsx';
import CardListSection from './sections/CardListSection.jsx';
import CTA from './sections/CTA.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';
import { navigation, experience, certifications, achievements, articles, projects, services, education } from './data/config.js';
import { has, allSkills } from './utils/content.js';
import { useReveal } from './hooks/useReveal.js';
import { initAnalytics } from './utils/analytics.js';

/**
 * Section registry — order here is the order on the page.
 * `show` decides visibility; hidden sections are also removed from the navigation.
 */
const SECTIONS = [
  { id: 'about', show: true, render: (i) => <About index={i} /> },
  { id: 'skills', show: allSkills.length > 0, render: (i) => <Skills index={i} /> },
  { id: 'services', show: has(services), render: (i) => <WhatIDo index={i} /> },
  { id: 'projects', show: has(projects), render: (i) => <Projects index={i} /> },
  { id: 'experience', show: has(experience), render: (i) => <Experience index={i} /> },
  { id: 'education', show: has(education), render: (i) => <Education index={i} /> },
  { id: 'leetcode', show: true, render: (i) => <LeetCode index={i} /> },
  {
    id: 'certifications',
    show: has(certifications),
    render: (i) => (
      <CardListSection id="certifications" index={i} eyebrow="Certifications" title="Certifications" items={certifications} icon="award" linkLabel="View credential" />
    ),
  },
  {
    id: 'achievements',
    show: has(achievements),
    render: (i) => <CardListSection id="achievements" index={i} eyebrow="Achievements" title="Achievements" items={achievements} icon="trophy" />,
  },
  {
    id: 'articles',
    show: has(articles),
    render: (i) => <CardListSection id="articles" index={i} eyebrow="Writing" title="Articles" items={articles} icon="book" linkLabel="Read article" />,
  },
];

export default function App() {
  const visible = SECTIONS.filter((s) => s.show);
  const visibleIds = new Set(['home', 'contact', ...visible.map((s) => s.id)]);
  const navItems = navigation.filter((n) => visibleIds.has(n.id));

  useReveal([]);
  useEffect(() => {
    initAnalytics();
  }, []);

  // Section numbers ("01", "02"…) follow the visible order; Contact is always last.
  const num = (i) => String(i + 1).padStart(2, '0');

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <Navbar items={navItems} />
      <main id="main" tabIndex={-1}>
        <Hero />
        {visible.map((s, i) => (
          <div key={s.id} className="section-wrap">
            {s.render(num(i))}
          </div>
        ))}
        <CTA />
        <Contact index={num(visible.length)} />
      </main>
      <Footer items={navItems} />
    </>
  );
}
