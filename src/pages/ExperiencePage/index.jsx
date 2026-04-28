import { useState, useEffect } from 'react';

const EXP_W = 1440, EXP_H = 1024;

const JOBS = [
  { mode: 'd-----', dates: '8/25–3/26', name: 'Junior-Software-Developer',           company: 'Flecha Roja Technologies' },
  { mode: 'd-----', dates: '8/21–6/23', name: 'Junior-Software-Developer',           company: 'Kougar Logic'             },
  { mode: 'd-----', dates: '8/24–12/24', name: 'Teaching-Assistant-Project-Management', company: 'UCR'                   },
  { mode: 'd-----', dates: '1/24–12/24', name: 'English-and-Computer-Instructor',    company: 'AGEMA (UCR)'              },
];

const TASKS = [
  'Designed and implemented modern, responsive interfaces aligned with product goals.',
  'Translated Figma designs into production-ready code using Angular, HTML, and SCSS.',
  'Built reusable components and scalable design systems.',
  'Maintained and enhanced serverless functions (AWS Lambda), improving logic, fixing bugs, and documenting processes to ensure system reliability.',
];

function ExperienceMobile({ goTo }) {
  return (
    <div style={{ width: '100vw', height: '100vh', overflowY: 'auto', backgroundColor: '#F1EEE9', fontFamily: "'IBM Plex Mono', monospace" }} data-scrollable="true">
      <div style={{ padding: '40px 24px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: "'VT323', monospace", fontSize: 48, color: 'rgba(134,216,66,0.2)', lineHeight: 0.9 }}>My Experience</div>
        <div style={{ fontFamily: "'VT323', monospace", fontSize: 34, color: '#86D842', marginTop: -14 }}>My Experience</div>
      </div>
      <div style={{ margin: '24px 16px 40px', background: '#1a1a1a', borderRadius: 8, padding: 20, color: '#ccc', fontSize: 13, lineHeight: 1.7 }}>
        <div style={{ color: '#a0a0a0', marginBottom: 16 }}>PS C:\Users\michelle\my_experience&gt; ls -R</div>
        <div style={{ color: '#a0a0a0', marginBottom: 8 }}>Directory: C:\Users\michelle\my_experience</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '4px 12px', marginBottom: 16 }}>
          <span style={{ fontWeight: 'bold' }}>Mode</span>
          <span style={{ fontWeight: 'bold' }}>Dates</span>
          <span style={{ fontWeight: 'bold' }}>Name</span>
          {JOBS.map((j, i) => [
            <span key={i + 'm'}>{j.mode}</span>,
            <span key={i + 'd'}>{j.dates}</span>,
            <span key={i + 'n'} style={{ color: '#86D842' }}>{j.name}<br /><span style={{ color: '#888', fontSize: 11 }}>{j.company}</span></span>,
          ])}
        </div>
        <div style={{ color: '#a0a0a0', marginBottom: 8 }}>Directory: …\Flecha-Roja-Technologies</div>
        {TASKS.map((t, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <span style={{ color: '#666', marginRight: 8 }}>d-----</span>{t}
          </div>
        ))}
        <div style={{ marginTop: 16, textAlign: 'right', color: '#666', cursor: 'pointer' }} onClick={() => goTo && goTo(3)}>
          enter to continue...<span style={{ animation: 'termCursor 1s infinite', marginLeft: 2 }}>▮</span>
        </div>
      </div>
    </div>
  );
}

export default function PageExperience({ goTo }) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth, h = window.innerHeight;
      setIsMobile(w < 768);
      setScale(Math.min(w / EXP_W, h / EXP_H) * 0.97);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter' && !isMobile) goTo && goTo(3); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, goTo]);

  if (isMobile) return <ExperienceMobile goTo={goTo} />;

  const monW = 1040, monH = 840;
  const monLeft = 200, monTop = 200;
  const termL = 98, termT = 124, termW = 862;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#F1EEE9' }}>
      <div style={{
        position: 'absolute', width: EXP_W, height: EXP_H,
        left: '50%', top: '50%',
        transform: `translate(-50%,-50%) scale(${scale})`,
        transformOrigin: 'center center',
        backgroundColor: '#F1EEE9',
      }}>
        {/* Title ghost */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 48, textAlign: 'center', fontFamily: "'VT323', monospace", fontSize: 96, color: 'rgba(134,216,66,0.15)', lineHeight: 1, zIndex: 1, pointerEvents: 'none' }}>
          My Experience
        </div>
        {/* Title solid */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 72, textAlign: 'center', fontFamily: "'VT323', monospace", fontSize: 52, color: '#86D842', zIndex: 2, pointerEvents: 'none' }}>
          My Experience
        </div>

        <img src="/assets/decoration/silver-star.png" alt="" className="float-b"
          style={{ position: 'absolute', left: 20, top: 0, width: 130, opacity: 0.85 }} />
        <img src="/assets/decoration/pink-double-star.png" alt="" className="float-a"
          style={{ position: 'absolute', right: 20, top: 10, width: 120 }} />
        <img src="/assets/flowers/green-orchid.png" alt=""
          style={{ position: 'absolute', right: 30, top: 160, width: 200, opacity: 0.8 }} />
        <img src="/assets/flowers/spotted-lily.png" alt=""
          style={{ position: 'absolute', left: -20, top: 300, width: 230, opacity: 0.7 }} />

        {/* CRT Monitor */}
        <div style={{ position: 'absolute', left: monLeft, top: monTop, width: monW, height: monH }}>
          <img src="/assets/experience/monitor.png" alt="CRT Monitor"
            style={{ position: 'absolute', inset: 0, width: '100%', objectFit: 'contain', height: '994px' }} />

          {/* Terminal on screen */}
          <div style={{
            position: 'absolute',
            left: termL, top: termT,
            width: termW, height: 530,
            overflow: 'hidden',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 16, lineHeight: 1.6,
            color: '#333',
            padding: '10px 18px',
          }}>
            <div style={{ color: '#a0a0a0', marginBottom: 12 }}>
              PS C:\Users\michelle\my_experience&gt; ls -R
            </div>
            <div style={{ color: '#a0a0a0', marginBottom: 8 }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Directory: C:\Users\michelle\my_experience
            </div>

            <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: 16 }}>
              <thead>
                <tr>
                  {['Mode', 'Dates', 'Name', 'Company'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: 24, paddingBottom: 4, color: '#333' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {JOBS.map((j, i) => (
                  <tr key={i}>
                    <td style={{ paddingRight: 24, color: '#888' }}>{j.mode}</td>
                    <td style={{ paddingRight: 24, fontWeight: 'bold' }}>{j.dates}</td>
                    <td style={{ paddingRight: 24, color: '#5A9A25', fontWeight: 'bold' }}>{j.name}</td>
                    <td style={{ color: '#333' }}>{j.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ color: '#a0a0a0', marginBottom: 8 }}>
              &nbsp;&nbsp;&nbsp;&nbsp;Directory: C:\Users\michelle\my_experience\Flecha-Roja-Technologies
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: 24, paddingBottom: 4, color: '#333' }}>Mode</th>
                  <th style={{ textAlign: 'left', fontWeight: 'bold', paddingBottom: 4, color: '#333' }}>Tasks</th>
                </tr>
              </thead>
              <tbody>
                {TASKS.map((task, i) => (
                  <tr key={i}>
                    <td style={{ paddingRight: 24, color: '#888', verticalAlign: 'top' }}>d-----</td>
                    <td style={{ paddingBottom: 6 }}>{task}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              onClick={() => goTo && goTo(3)}
              style={{ textAlign: 'right', color: '#a0a0a0', marginTop: 8, cursor: 'pointer', userSelect: 'none', fontSize: 15 }}
            >
              enter to continue...
              <span style={{ animation: 'termCursor 1s infinite', marginLeft: 3 }}>▮</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
