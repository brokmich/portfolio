import { useState, useEffect } from 'react';

const ABOUT_W = 1440, ABOUT_H = 1024;

const THINGS_I_LOVE = [
  'My cat',
  'Fantasy books',
  'Going to the movies',
  'Music',
  'Little Women (Greta Gerwig)',
  'Experiences that make you feel something',
  'Being a sister',
  'Sweets & fruits',
  'Going to the beach',
  'Pretty things & making normal things grand',
];

const BIO = "Born in Costa Rica, raised for a decade in New Jersey — I grew up between two worlds. Snowy Christmases and green eggs and ham days on one side; gallo pinto for breakfast, independence day in a folklore skirt, and fresh pipa juice at the beach on the other. I came back to Costa Rica at 12 and rebuilt myself in a country that was always mine but suddenly felt new. I studied Computer Science at la Universidad de Costa Rica, fell in love with user experience design, and graduated in April 2025. Now I'm looking for something that excites me.";

function AboutMobile() {
  return (
    <div style={{
      width: '100vw', height: '100vh', overflowY: 'auto',
      overscrollBehavior: 'contain',
      backgroundColor: '#F1EEE9', position: 'relative',
      fontFamily: "'IBM Plex Mono', monospace",
    }} data-scrollable="true">
      <img src="/assets/about/flower-6.png" alt=""
        style={{ position: 'absolute', right: -20, top: 0, width: 160, transform: 'rotate(20deg)', opacity: 0.7 }} />

      <div style={{ padding: '40px 28px 0', fontFamily: "'Cedarville Cursive', cursive", fontSize: 42, lineHeight: 1.1, color: '#C76D9A' }}>
        Michelle<br />Fonseca Carrillo
      </div>
      <div style={{ padding: '6px 28px 0', fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#A13D6F' }}>
        Coronado, Costa Rica
      </div>

      <div style={{ padding: '24px 28px 0', display: 'flex', justifyContent: 'center' }}>
        <img src="/assets/about/photo-bw.png" alt="Michelle" style={{ width: '75vw', maxWidth: 280, borderRadius: 4, objectFit: 'cover' }} />
      </div>

      <div style={{ padding: '28px 28px 0' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, textDecoration: 'underline', marginBottom: 12 }}>Who I am</div>
        <p style={{ fontSize: 14, lineHeight: 1.7, textAlign: 'justify', color: '#000' }}>{BIO}</p>
      </div>

      <div style={{ margin: '28px 28px 0', background: '#fff', borderRadius: 8, padding: '20px 22px', border: '1.5px solid #E8D5DE', position: 'relative' }}>
        <p style={{ fontFamily: "'Cedarville Cursive', cursive", fontSize: 20, color: '#A13D6F', lineHeight: 1.4, marginBottom: 10 }}>
          "The most dangerous phrase is: 'We've always done it this way.'"
        </p>
        <p style={{ fontFamily: "'Cedarville Cursive', cursive", fontSize: 16, color: '#A13D6F', textAlign: 'right' }}>— Grace Hopper</p>
      </div>

      <div style={{ padding: '28px 28px 40px' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Things I love</div>
        {THINGS_I_LOVE.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 14, lineHeight: 1.7, color: '#1F330E' }}>
            <span style={{ color: '#5A9A25', flexShrink: 0 }}>•</span><span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageAbout() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth, h = window.innerHeight;
      setIsMobile(w < 768);
      setScale(Math.min(w / ABOUT_W, h / ABOUT_H) * 0.97);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (isMobile) return <AboutMobile />;

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#F1EEE9' }}>
      <div style={{
        position: 'absolute', width: ABOUT_W, height: ABOUT_H,
        left: '50%', top: '50%',
        transform: `translate(-50%,-50%) scale(${scale})`,
        transformOrigin: 'center center',
        backgroundColor: '#F1EEE9', overflow: 'hidden',
      }}>
        {/* Name header */}
        <div style={{ position: 'absolute', left: 43, top: 44, fontFamily: "'Cedarville Cursive', cursive", fontSize: 85, lineHeight: 1, color: '#C76D9A', zIndex: 5 }}>
          Michelle<br />Fonseca Carrillo
        </div>

        {/* Location */}
        <span style={{ position: 'absolute', left: 1155, top: 173, fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#A13D6F' }}>
          Coronado, Costa Rica
        </span>

        {/* Orchid frame + photo top-right */}
        <div style={{ position: 'absolute', left: 817, top: 0, width: 356, height: 417, overflow: 'hidden' }}>
          <img src="/assets/about/orchid-frame.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <img src="/assets/about/photo-bw.png" alt="Michelle" style={{ position: 'absolute', left: 33, top: 39, width: 290, height: 340, objectFit: 'cover' }} />
        </div>

        {/* Flower top-left */}
        <img src="/assets/about/flower-6.png" alt="" className="float-c"
          style={{ position: 'absolute', left: 35, top: 76, width: 190, height: 157, objectFit: 'contain', transform: 'rotate(22deg)' }} />

        {/* Cloud sticker left */}
        <img src="/assets/about/sticker-cloud.png" alt=""
          style={{ position: 'absolute', left: 0, top: 441, width: 220, objectFit: 'contain' }} />

        {/* Who I am block */}
        <div style={{ position: 'absolute', left: 58, top: 254, width: 622, zIndex: 4 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 30, textDecoration: 'underline', marginBottom: 16, color: '#000' }}>
            Who I am
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 16, textAlign: 'justify', lineHeight: 1.55, color: '#000' }}>
            {BIO}
          </p>
        </div>

        {/* BW photo bleeds bottom-left */}
        <img src="/assets/about/photo-bw.png" alt=""
          style={{ position: 'absolute', left: -72, top: 546, width: 501, height: 500, objectFit: 'cover' }} />

        {/* Gladiolus bottom-right */}
        <img src="/assets/about/gladiolus.png" alt="" className="float-c"
          style={{ position: 'absolute', left: 1220, top: 742, width: 220, objectFit: 'contain' }} />

        {/* Quote notecard */}
        <div style={{ position: 'absolute', left: 747, top: 260, width: 480, height: 530, overflow: 'hidden', zIndex: 3 }}>
          <img src="/assets/about/notecard.png" alt=""
            style={{ position: 'absolute', left: 60, top: 0, width: 420, height: 500, objectFit: 'cover', transform: 'matrix(0.997,0.082,-0.082,0.997,0,0)', opacity: 0.92 }} />
          <div style={{ position: 'absolute', left: 136, top: 240, width: 260, fontFamily: "'Cedarville Cursive', cursive", fontSize: 26, lineHeight: 1.4, color: '#A13D6F', zIndex: 2 }}>
            "The most dangerous phrase is: 'We've always done it this way.'"
          </div>
          <div style={{ position: 'absolute', left: 210, top: 378, fontFamily: "'Cedarville Cursive', cursive", fontSize: 19, color: '#A13D6F', zIndex: 2 }}>
            — Grace Hopper
          </div>
        </div>

        {/* Pin sticker */}
        <img src="/assets/about/pin-sticker.png" alt=""
          style={{ position: 'absolute', left: 707, top: 415, width: 178, height: 197, objectFit: 'contain', zIndex: 4 }} />

        {/* Things I love */}
        <div style={{ position: 'absolute', left: 335, top: 530, width: 300, zIndex: 4 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, color: '#000', marginBottom: 10 }}>
            Things I love
          </div>
          {THINGS_I_LOVE.map((item, i) => (
            <div key={i} style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, lineHeight: 1.65, color: '#1F330E', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ color: '#5A9A25', flexShrink: 0, paddingLeft: i * 6 }}>•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Stars */}
        <img src="/assets/about/star-5.png" alt="" className="float-b"
          style={{ position: 'absolute', left: 942, top: 245, width: 142, objectFit: 'contain', transform: 'rotate(-11deg)' }} />
        <img src="/assets/about/star-4.png" alt="" className="float-a"
          style={{ position: 'absolute', left: 865, top: 320, width: 150, objectFit: 'contain', transform: 'rotate(-22deg)' }} />
      </div>
    </div>
  );
}
