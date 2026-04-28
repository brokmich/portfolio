import { useState } from 'react';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'mfonsecarrillo@gmail.com',
    href: 'mailto:mfonsecarrillo@gmail.com',
    icon: '✉',
    color: '#C76D9A',
    bg: 'rgba(199,109,154,0.08)',
    border: 'rgba(199,109,154,0.3)',
  },
  {
    label: 'LinkedIn',
    value: 'michelle-fonseca-carrillo',
    href: 'https://www.linkedin.com/in/michelle-fonseca-carrillo-147768340',
    icon: 'in',
    color: '#0077B5',
    bg: 'rgba(0,119,181,0.08)',
    border: 'rgba(0,119,181,0.3)',
  },
  {
    label: 'GitHub',
    value: 'github.com/michellefonseca',
    href: 'https://github.com/michellefonseca',
    icon: '</>',
    color: '#1F330E',
    bg: 'rgba(31,51,14,0.08)',
    border: 'rgba(31,51,14,0.3)',
  },
  {
    label: 'Portfolio',
    value: 'michellefonseca.dev',
    href: '#',
    icon: '✦',
    color: '#9B6B1A',
    bg: 'rgba(155,107,26,0.08)',
    border: 'rgba(155,107,26,0.3)',
  },
];

function ContactCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        background: hovered ? item.bg : 'rgba(255,255,255,0.72)',
        border: `1.5px solid ${hovered ? item.color : item.border}`,
        borderRadius: 14, padding: '16px 24px',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
        width: 320,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%',
        background: item.bg, border: `1.5px solid ${item.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, fontWeight: 'bold', color: item.color,
        flexShrink: 0,
      }}>{item.icon}</div>
      <div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: '#1a1a1a', marginBottom: 2 }}>{item.label}</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#666' }}>{item.value}</div>
      </div>
    </a>
  );
}

export default function PageContact() {
  return (
    <div style={{
      width: '100vw', height: '100vh', overflow: 'hidden',
      backgroundColor: '#F7E7E8',
      backgroundImage: 'linear-gradient(#FFF0F1 2px,transparent 2px),linear-gradient(90deg,#FFF0F1 2px,transparent 2px)',
      backgroundSize: '70px 70px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <img src="/assets/decoration/silver-star.png" alt="" className="float-b"
        style={{ position: 'absolute', left: 28, top: 28, width: 96 }} />
      <img src="/assets/flowers/spotted-lily.png" alt="" className="float-c"
        style={{ position: 'absolute', right: -20, top: -14, width: 250, opacity: 0.88 }} />
      <img src="/assets/decoration/rainbow.png" alt=""
        style={{ position: 'absolute', left: -20, bottom: 20, width: 280, transform: 'rotate(8deg)', opacity: 0.65 }} />
      <img src="/assets/decoration/pink-double-star.png" alt="" className="float-a"
        style={{ position: 'absolute', right: 50, bottom: 36, width: 118 }} />
      <img src="/assets/decoration/blue-heart.png" alt=""
        style={{ position: 'absolute', left: 70, bottom: 44, width: 88, transform: 'rotate(-14deg)' }} />
      <img src="/assets/decoration/cat-1.png" alt="" className="float-b"
        style={{ position: 'absolute', right: 36, top: '52%', width: 110 }} />

      <div style={{ textAlign: 'center', marginBottom: 8, zIndex: 2 }}>
        <div style={{ fontFamily: "'Cedarville Cursive', cursive", fontSize: 'clamp(34px,4.5vw,64px)', color: '#C76D9A', lineHeight: 1.1 }}>
          Let's connect!
        </div>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: '#999', marginTop: 10 }}>
          Open to opportunities, collaborations &amp; conversations.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, zIndex: 2, marginTop: 14 }}>
        {CONTACT_LINKS.map((item, i) => <ContactCard key={i} item={item} />)}
      </div>

      <div style={{
        marginTop: 24, zIndex: 2,
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: '#5A9A25',
        background: 'rgba(90,154,37,0.1)', border: '1.5px solid rgba(90,154,37,0.35)',
        borderRadius: 20, padding: '6px 18px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5A9A25', display: 'inline-block', animation: 'termCursor 1.5s infinite' }}></span>
        Available for new opportunities · Coronado, Costa Rica
      </div>
    </div>
  );
}
