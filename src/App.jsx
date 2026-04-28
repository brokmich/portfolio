import { useState, useEffect, useCallback, useRef } from 'react';
import WelcomePage from './pages/WelcomePage';
import PageAbout from './pages/AboutPage';
import PageExperience from './pages/ExperiencePage';
import PageTechStack from './pages/TechStackPage';
import PageProjects from './pages/ProjectsPage';
import PageContact from './pages/ContactPage';

const NAV_PAGES = [
  { label: 'Home'       },
  { label: 'About Me'   },
  { label: 'Experience' },
  { label: 'Tech Stack' },
  { label: 'Projects'   },
  { label: 'Contact'    },
];

const PAGES = [WelcomePage, PageAbout, PageExperience, PageTechStack, PageProjects, PageContact];

function SideNav({ current, goTo }) {
  return (
    <nav className="side-nav">
      {NAV_PAGES.map((p, i) => (
        <div
          key={i}
          className="nav-dot-wrap"
          onClick={() => goTo(i)}
          title={p.label}
        >
          <div className={`nav-dot${i === current ? ' active' : ''}`} />
          <span className="nav-label">{p.label}</span>
        </div>
      ))}
    </nav>
  );
}

export default function App() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrent(i); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const goTo = useCallback((idx) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Arrow key navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('[data-scrollable]')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(Math.min(current + 1, PAGES.length - 1));
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(Math.max(current - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  return (
    <div
      ref={containerRef}
      className="snap-container"
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
      }}
    >
      {PAGES.map((Page, i) => (
        <div
          key={i}
          ref={el => { sectionRefs.current[i] = el; }}
          style={{
            height: '100vh',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Page goTo={goTo} />
        </div>
      ))}
      <SideNav current={current} goTo={goTo} />
    </div>
  );
}
