import { useState } from 'react';

const PROJECT_LIST = [
  {
    id: 'costly', num: '01',
    title: 'COSTLY',
    type: 'Full Stack Dev',
    accent: '#00879A',
    role: 'Full Stack Developer (team of 3)',
    timeline: '2024',
    tools: ['React', 'Node.js', 'PostgreSQL'],
    links: [],
    overview: 'An import management system built fullstack from scratch with a team of three developers, covering the complete product lifecycle — from schema design to responsive UI.',
    highlights: [
      'Implemented complete CRUD across frontend and backend.',
      'Built reusable React component library used across multiple views.',
      'Improved UX through responsive design and smooth navigation.',
      'Designed REST API and database schema collaboratively.',
    ],
  },
  {
    id: 'themepark', num: '02',
    title: 'THEMEPARK@UCR',
    type: 'VR · Full Stack',
    accent: '#1F330E',
    role: 'Backend Developer',
    timeline: '2024',
    tools: ['Unity', 'C#', '.NET', 'SQL Server'],
    links: [],
    overview: 'A collaborative VR theme park application developed at UCR in a Scrum environment, applying Clean Architecture and SOLID principles throughout.',
    highlights: [
      'Built backend services with .NET and SQL Server.',
      'Applied SOLID principles and Clean Architecture patterns.',
      'Worked in fortnightly Scrum sprints with a cross-functional team.',
      'VR experience driven by real-time database data.',
    ],
  },
  {
    id: 'portfolio-freelance', num: '03',
    title: 'PERSONAL PORTFOLIO',
    type: 'Freelance · Frontend',
    accent: '#7B4F9E',
    role: 'Frontend Developer',
    timeline: '2024',
    tools: ['React', 'Vite', 'Framer Motion'],
    links: [],
    overview: 'A complete portfolio website delivered for a freelance client, featuring modern animations and automated deployment via GitHub Pages.',
    highlights: [
      'Designed and developed full site from brief to delivery.',
      'Implemented page transitions and scroll animations with Framer Motion.',
      'Deployed with GitHub Pages and automated build pipeline.',
    ],
  },
  {
    id: 'jale', num: '04',
    title: 'JALE',
    type: 'Mobile App  🚧',
    accent: '#A13D6F',
    role: 'Developer',
    timeline: 'In Progress',
    tools: ['React Native', 'Expo', 'Supabase'],
    links: [],
    overview: 'A mobile app for discovering and sharing local events in the GAM region of Costa Rica — bridging people with experiences in their community.',
    highlights: [
      'Real-time event listings via Supabase.',
      'Location-based filtering for nearby events.',
      'Cross-platform (iOS & Android) with React Native + Expo.',
    ],
  },
  {
    id: 'cozy', num: '05',
    title: 'COZY DEV TEMPLATE',
    type: 'Commercial Product ✨',
    accent: '#9B6B1A',
    role: 'Solo Developer & Designer',
    timeline: '2024–Present',
    tools: ['React 19', 'Vite', 'Framer Motion'],
    links: [{ label: 'Gumroad', href: 'https://gumroad.com' }],
    overview: 'A pixel-art Stardew Valley–themed developer portfolio template sold commercially on Gumroad, with ongoing support and customization services.',
    highlights: [
      'Dynamic day/night theming based on real system time.',
      'Pixel art avatar customization service for buyers.',
      'Interactive UI components and smooth page transitions.',
      'Independently marketed and sold on Gumroad.',
    ],
  },
  {
    id: 'flecha-roja', num: '06',
    title: 'FLECHA ROJA',
    type: 'UX / UI Redesign',
    accent: '#C76D9A',
    role: 'UX/UI Designer',
    timeline: '2024',
    tools: ['Figma', 'UX Research', 'Design Systems'],
    links: [],
    overview: "End-to-end redesign of Flecha Roja's digital presence, aligning a legacy brand identity with a modern, accessible, and user-centred interface.",
    highlights: [
      'Conducted stakeholder interviews and heuristic evaluation.',
      'Redefined information architecture and navigation structure.',
      'Delivered a full component library and design system in Figma.',
      'Improved task completion rate measured in usability testing.',
    ],
  },
  {
    id: 'aldeas', num: '07',
    title: 'ALDEAS SOS',
    type: 'UX / UI Design',
    accent: '#5A9A25',
    role: 'UX/UI Designer',
    timeline: '2023',
    tools: ['Figma', 'User Research', 'Prototyping'],
    links: [],
    overview: "Administrative platform redesign for Aldeas SOS Costa Rica — simplifying complex, multi-step workflows for NGO staff who manage children's cases daily.",
    highlights: [
      'Mapped 12 distinct user flows through contextual interviews.',
      'Simplified a 7-step data-entry form down to 3 steps.',
      'Created an accessible, high-contrast design system.',
      'Delivered full interactive prototype for developer handoff.',
    ],
  },
  {
    id: 'abc', num: '08',
    title: 'ABC SEÑAS',
    type: 'UX / UI · Accessibility',
    accent: '#7B4F9E',
    role: 'UX/UI Designer',
    timeline: '2023',
    tools: ['Figma', 'Accessibility', 'Mobile'],
    links: [],
    overview: 'An educational mobile app teaching Costa Rican Sign Language (LESCO) to deaf children through play, interaction, and animated sign tutorials.',
    highlights: [
      'Designed with WCAG accessibility guidelines throughout.',
      'Co-created with CENSE (National Center for Special Education).',
      'Gamified learning flow with animated sign demonstrations.',
      'Full mobile prototype from zero to developer handoff.',
    ],
  },
  {
    id: 'parqueu', num: '09',
    title: 'PARQUEU',
    type: 'Branding · UI Design',
    accent: '#D46A00',
    role: 'UI Designer',
    timeline: '2023',
    tools: ['Figma', 'Branding', 'UI Design'],
    links: [],
    overview: 'Brand identity and interface design for ParqueU — a university parking management concept designed to reduce friction and save time for students and staff.',
    highlights: [
      'Defined visual identity, color system and typography.',
      'Designed key screens: home, map view, and reservation flow.',
      'Produced branded stationery and mockup assets.',
    ],
  },
];

function tornTop() {
  const pts = [];
  for (let i = 0; i <= 50; i++) {
    const x = i * 2;
    const y = i % 2 === 0 ? 0 : (1.5 + Math.sin(i) * 0.5);
    pts.push(`${x}% ${y.toFixed(1)}%`);
  }
  return pts.join(', ');
}
function tornBottom() {
  const pts = [];
  for (let i = 50; i >= 0; i--) {
    const x = i * 2;
    const y = i % 2 === 0 ? 100 : (98.5 - Math.sin(i) * 0.5);
    pts.push(`${x}% ${y.toFixed(1)}%`);
  }
  return pts.join(', ');
}
const TORN_CLIP = `polygon(${tornTop()}, 100% 100%, ${tornBottom()}, 0% 0%)`;

function PlaylistView({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      backgroundColor: '#F7E7E8',
      backgroundImage: 'linear-gradient(#FFF0F1 2px,transparent 2px),linear-gradient(90deg,#FFF0F1 2px,transparent 2px)',
      backgroundSize: '70px 70px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <img src="/assets/about/star-4.png" alt="" className="float-b"
        style={{ position: 'absolute', left: 28, top: 28, width: 88, opacity: 0.75 }} />
      <img src="/assets/about/star-5.png" alt="" className="float-a"
        style={{ position: 'absolute', right: 40, top: 40, width: 80, opacity: 0.7 }} />
      <img src="/assets/decoration/silver-star.png" alt="" className="float-b"
        style={{ position: 'absolute', left: 60, bottom: 60, width: 90, opacity: 0.7 }} />
      <img src="/assets/decoration/silver-heart.png" alt=""
        style={{ position: 'absolute', right: 60, bottom: 50, width: 80, transform: 'rotate(18deg)', opacity: 0.75 }} />
      <img src="/assets/flowers/green-orchid.png" alt="" className="float-c"
        style={{ position: 'absolute', right: -20, top: '30%', width: 180, opacity: 0.6 }} />
      <img src="/assets/flowers/pink-lily.png" alt=""
        style={{ position: 'absolute', left: -10, bottom: '20%', width: 150, transform: 'rotate(-30deg)', opacity: 0.6 }} />

      <div style={{ position: 'absolute', left: 80, top: 52, fontFamily: "'Cedarville Cursive', cursive", fontSize: 22, color: '#C76D9A', transform: 'rotate(-8deg)', opacity: 0.7 }}>xoxo</div>
      <div style={{ position: 'absolute', right: 110, bottom: 70, fontFamily: "'Cedarville Cursive', cursive", fontSize: 18, color: '#A13D6F', transform: 'rotate(5deg)', opacity: 0.6 }}>xoxo</div>

      <div style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.18))', zIndex: 2 }}>
        <div style={{
          background: '#FFFDF9',
          clipPath: TORN_CLIP,
          width: 'min(500px,88vw)',
          padding: '40px 44px 44px',
          maxHeight: '80vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
        }} data-scrollable="true">
          <div style={{
            fontFamily: "'Cedarville Cursive', cursive",
            fontSize: 'clamp(28px,5vw,46px)',
            color: '#1a1a1a',
            textAlign: 'center',
            marginBottom: 6,
            lineHeight: 1.1,
          }}>My Projects</div>
          <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', margin: '10px 0 18px' }} />

          <div>
            {PROJECT_LIST.map((p, i) => (
              <div
                key={p.id}
                onClick={() => onSelect(p)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 10,
                  padding: '7px 6px',
                  borderRadius: 5,
                  cursor: 'pointer',
                  background: hovered === p.id ? `${p.accent}12` : 'transparent',
                  transition: 'background 0.15s ease',
                  borderBottom: i < PROJECT_LIST.length - 1 ? '1px dashed rgba(0,0,0,0.07)' : 'none',
                }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#aaa', width: 22, flexShrink: 0 }}>
                  {p.num}.
                </span>
                <span style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 'clamp(11px,1.4vw,14px)',
                  fontWeight: 500,
                  color: hovered === p.id ? p.accent : '#1a1a1a',
                  flex: 1, lineHeight: 1.4,
                  transition: 'color 0.15s ease',
                }}>{p.title}</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#bbb', textAlign: 'right', flexShrink: 0 }}>
                  {p.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailView({ proj, onBack }) {
  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      backgroundColor: '#F1EEE9',
      backgroundImage: 'radial-gradient(circle,#c8b89a 1px,transparent 1px)',
      backgroundSize: '22px 22px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <img src="/assets/about/star-4.png" alt="" className="float-b"
        style={{ position: 'absolute', right: 40, top: 30, width: 100, opacity: 0.7 }} />
      <img src="/assets/flowers/green-orchid.png" alt="" className="float-c"
        style={{ position: 'absolute', left: -20, bottom: '10%', width: 200, opacity: 0.55 }} />
      <img src="/assets/flowers/spotted-lily.png" alt=""
        style={{ position: 'absolute', right: -20, bottom: 0, width: 220, opacity: 0.6 }} />

      <button
        onClick={onBack}
        style={{
          position: 'absolute', top: 24, left: 24,
          background: 'rgba(255,255,255,0.85)', border: `1.5px solid ${proj.accent}55`,
          borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: proj.accent,
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'all 0.2s', zIndex: 10,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = proj.accent; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = proj.accent; }}
      >
        ← back
      </button>

      <div style={{
        background: 'rgba(255,255,255,0.88)',
        borderRadius: 18,
        border: `2px solid ${proj.accent}30`,
        padding: '36px 42px',
        maxWidth: 680, width: '90%',
        maxHeight: '80vh', overflowY: 'auto',
        overscrollBehavior: 'contain',
        boxShadow: '0 12px 48px rgba(0,0,0,0.12)',
        zIndex: 2,
      }} data-scrollable="true">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: '#1a1a1a', lineHeight: 1.2 }}>
            {proj.title.charAt(0) + proj.title.slice(1).toLowerCase().replace(/@ucr/, ' @UCR').replace(/sos/, 'SOS').replace(/señas/, 'Señas')}
          </div>
          <span style={{ background: proj.accent, color: '#fff', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, padding: '4px 12px', borderRadius: 4, flexShrink: 0, alignSelf: 'flex-start', marginTop: 4 }}>
            {proj.type}
          </span>
        </div>

        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: '#888', marginBottom: 22 }}>
          {proj.role} · {proj.timeline}
        </div>

        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: proj.accent, textDecoration: 'underline', marginBottom: 8 }}>
          Overview
        </div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, lineHeight: 1.7, color: '#333', marginBottom: 22, textAlign: 'justify' }}>
          {proj.overview}
        </p>

        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: proj.accent, textDecoration: 'underline', marginBottom: 10 }}>
          Key Highlights
        </div>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: 22 }}>
          {proj.highlights.map((h, i) => (
            <li key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, lineHeight: 1.65, color: '#333', display: 'flex', gap: 10, marginBottom: 7 }}>
              <span style={{ color: proj.accent, flexShrink: 0 }}>→</span><span>{h}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: proj.links && proj.links.length > 0 ? 20 : 0 }}>
          {proj.tools.map((t, i) => (
            <span key={i} style={{ background: `${proj.accent}14`, border: `1px solid ${proj.accent}44`, color: proj.accent, padding: '4px 14px', borderRadius: 12, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12 }}>
              {t}
            </span>
          ))}
        </div>

        {proj.links && proj.links.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {proj.links.map((lnk, i) => {
              const isGH  = /github/i.test(lnk.label);
              const isFig = /figma/i.test(lnk.label);
              const icon  = isGH ? '</>' : isFig ? '✦' : '↗';
              return (
                <a key={i} href={lnk.href} target="_blank" rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: proj.accent, color: '#fff', fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, padding: '9px 20px', borderRadius: 8, textDecoration: 'none', transition: 'opacity 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.82'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontSize: 11 }}>{icon}</span>{lnk.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PageProjects() {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [view, setView] = useState('list');

  const goToDetail = (proj) => {
    setAnimating(true);
    setTimeout(() => { setSelected(proj); setView('detail'); setAnimating(false); }, 220);
  };
  const goBack = () => {
    setAnimating(true);
    setTimeout(() => { setView('list'); setSelected(null); setAnimating(false); }, 220);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0,
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(10px)' : 'translateY(0)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }}>
        {view === 'list'
          ? <PlaylistView onSelect={goToDetail} />
          : <DetailView proj={selected} onBack={goBack} />
        }
      </div>
    </div>
  );
}
