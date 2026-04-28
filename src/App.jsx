import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomePage from './pages/WelcomePage';
import PageAbout from './pages/AboutPage';
import PageExperience from './pages/ExperiencePage';
import PageTechStack from './pages/TechStackPage';
import PageProjects from './pages/ProjectsPage';
import PageContact from './pages/ContactPage';

const NAV_PAGES = ['About Me', 'Experience', 'Tech Stack', 'Projects', 'Contact'];
const MAIN_PAGES = [PageAbout, PageExperience, PageTechStack, PageProjects, PageContact];

function SideNav({ current, goTo }) {
  return (
    <nav className="side-nav">
      {NAV_PAGES.map((label, i) => (
        <div key={i} className="nav-dot-wrap" onClick={() => goTo(i)} title={label}>
          <div className={`nav-dot${i === current ? ' active' : ''}`} />
          <span className="nav-label">{label}</span>
        </div>
      ))}
    </nav>
  );
}

export default function App() {
  const [showWelcome,  setShowWelcome]  = useState(true);
  const [dismissing,   setDismissing]   = useState(false);
  const [aboutReady,   setAboutReady]   = useState(false);
  const [current,      setCurrent]      = useState(0);
  const sectionRefs = useRef([]);

  // Single dismiss function — called on first scroll/touch
  const dismiss = useCallback(() => {
    if (dismissing) return;
    setDismissing(true);
    // About Me starts rising while welcome elements are still in motion
    setTimeout(() => setAboutReady(true),  350);
    // Remove overlay after all layer animations finish (~1.3s)
    setTimeout(() => setShowWelcome(false), 1350);
  }, [dismissing]);

  useEffect(() => {
    if (!showWelcome) return;
    window.addEventListener('wheel',     dismiss, { once: true, passive: true });
    window.addEventListener('touchmove', dismiss, { once: true, passive: true });
    return () => {
      window.removeEventListener('wheel',     dismiss);
      window.removeEventListener('touchmove', dismiss);
    };
  }, [showWelcome, dismiss]);

  // Track active section
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

  // Arrow key navigation (only after welcome)
  useEffect(() => {
    if (showWelcome) return;
    const onKey = (e) => {
      if (e.target.closest('[data-scrollable]')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(Math.min(current + 1, MAIN_PAGES.length - 1));
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  goTo(Math.max(current - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo, showWelcome]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>

      {/* ── Main scroll container ── */}
      <div
        className="snap-container"
        style={{
          height: '100vh',
          overflowY: showWelcome ? 'hidden' : 'scroll',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
        }}
      >
        {MAIN_PAGES.map((Page, i) => (
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
            {i === 0 ? (
              <motion.div
                style={{ height: '100%' }}
                initial={{ y: 80 }}
                animate={{ y: aboutReady ? 0 : 80 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Page goTo={goTo} />
              </motion.div>
            ) : (
              <Page goTo={goTo} />
            )}
          </div>
        ))}
      </div>

      {/* ── Side nav (only after welcome) ── */}
      {!showWelcome && <SideNav current={current} goTo={goTo} />}

      {/* ── Welcome overlay ── */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            style={{ position: 'fixed', inset: 0, zIndex: 9000, pointerEvents: dismissing ? 'none' : 'auto' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <WelcomePage dismissing={dismissing} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
