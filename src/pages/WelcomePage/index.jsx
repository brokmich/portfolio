import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import "./WelcomePage.css";

const W = 1440, H = 1024;
const SCALE = 0.78;
const l  = (px) => `${((px / W) * 100).toFixed(3)}%`;
const t  = (px) => `${((px / H) * 100).toFixed(3)}%`;
const w  = (px) => `${((px / W) * 100 * SCALE).toFixed(3)}vw`;
const lvw = (px) => `${((px / W) * 100).toFixed(3)}vw`;
const cx = (widthPx)  => `calc(50% - ${(((widthPx / W) * 100 * SCALE) / 2).toFixed(3)}vw)`;
const cy = (heightPx) => `calc(50% - ${(((heightPx / W) * 100 * SCALE) / 2).toFixed(3)}vw)`;

const welcomeLetters   = [
  { char:"W", left:178, top:174,    rotate:0,   hoverR:-10 },
  { char:"E", left:221, top:185,    rotate:0,   hoverR:8   },
  { char:"L", left:264, top:182,    rotate:-13, hoverR:-8  },
  { char:"C", left:315, top:185,    rotate:0,   hoverR:8   },
  { char:"O", left:365, top:177,    rotate:9,   hoverR:14  },
  { char:"M", left:407, top:179,    rotate:-9,  hoverR:-14 },
  { char:"E", left:456, top:185,    rotate:0,   hoverR:8   },
];
const toLetters        = [
  { char:"T", left:489, top:338.32, rotate:-13, hoverR:-8  },
  { char:"O", left:537, top:339,    rotate:17,  hoverR:12  },
];
const myLetters        = [
  { char:"M", left:908, top:728.29, rotate:-11, hoverR:-16 },
  { char:"Y", left:954, top:729,    rotate:7,   hoverR:12  },
];
const portfolioLetters = [
  { char:"P", left:900,  top:884, rotate:8,   hoverR:13  },
  { char:"O", left:946,  top:878, rotate:-19, hoverR:-14 },
  { char:"R", left:992,  top:885, rotate:-33, hoverR:-28 },
  { char:"T", left:1038, top:880, rotate:-5,  hoverR:-10 },
  { char:"F", left:1084, top:876, rotate:13,  hoverR:18  },
  { char:"O", left:1130, top:883, rotate:-14, hoverR:-19 },
  { char:"L", left:1176, top:878, rotate:-16, hoverR:-21 },
  { char:"I", left:1218, top:886, rotate:-8,  hoverR:-13 },
  { char:"O", left:1260, top:880, rotate:20,  hoverR:25  },
];

function BounceLetterImg({ char, leftCss, topCss, rotate, hoverR, delay }) {
  return (
    <motion.div
      className="letter-wrapper"
      style={{ left: leftCss, top: topCss, rotate }}
      initial={{ opacity: 0, scale: 0.5, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{
        y: -10, scale: 1.2, rotate: hoverR,
        transition: { type:"spring", stiffness:500, damping:12 },
      }}
    >
      <motion.img
        src={`/assets/letters/${char}.png`}
        className="letter-img"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.8 + delay * 0.3, repeat: Infinity, ease:"easeInOut", delay: delay * 0.2 }}
        alt={char}
      />
    </motion.div>
  );
}

function LetterWord({ letters, startDelay = 0, delayStep = 0.05 }) {
  const anchor = letters[0];
  return (
    <div style={{ position:"absolute", left: l(anchor.left), top: t(anchor.top), pointerEvents:"none" }}>
      {letters.map((letter, i) => (
        <BounceLetterImg
          key={i} {...letter}
          leftCss={lvw(letter.left - anchor.left)}
          topCss={lvw(letter.top  - anchor.top)}
          delay={startDelay + delayStep * i}
        />
      ))}
    </div>
  );
}

function HoverImg({ src, style, entranceDelay = 0, hoverScale = 1.06 }) {
  return (
    <motion.img
      src={src}
      className="scene-element"
      style={{ pointerEvents:"auto", ...style }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.5, delay: entranceDelay },
        scale:   { duration: 0.5, delay: entranceDelay, ease:"backOut" },
      }}
      whileHover={{ scale: hoverScale, transition:{ duration:0.2 } }}
      alt=""
    />
  );
}

// ─── Layer exit helper ────────────────────────────────────────────────────────
// Each layer gets a different y target and duration, creating the accordion feel
function layer(dismissing, y, duration, delay = 0) {
  return {
    animate:    { y: dismissing ? y : 0 },
    transition: { duration, delay, ease: [0.4, 0, 1, 1] },
  };
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function WelcomePage({ dismissing = false }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness:55, damping:22 });
  const springY = useSpring(mouseY, { stiffness:55, damping:22 });
  const x3 = useTransform(springX, (v) => v * 45);
  const y3 = useTransform(springY, (v) => v * 45);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX / window.innerWidth  - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <div ref={containerRef} className="welcome-page" onMouseMove={handleMouseMove}>

      {/* ── Layer 0: Page background + cheetah stripe — slowest of all ───── */}
      <motion.div
        style={{
          position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden",
          backgroundColor:'#F7E7E8',
          backgroundImage:'linear-gradient(#FFF0F1 2px,transparent 2px),linear-gradient(90deg,#FFF0F1 2px,transparent 2px)',
          backgroundSize:'3.5vw 3.5vw',
        }}
        {...layer(dismissing, "-105vh", 1.3, 0)}
      >
        <motion.img
          src="/assets/bg/cheetah-stripe.png"
          className="scene-element"
          style={{ left:l(1272), top:t(-67), width:w(78), height:"130vh", objectFit:"cover", zIndex:0 }}
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.6 }}
          alt=""
        />
      </motion.div>

      {/* ── Layer 2: Central composition — medium-slow ──────────────────── */}
      <motion.div
        style={{ position:"absolute", left:0, top:"calc(50vh - 35.556vw)", width:"100vw", height:"71.111vw", pointerEvents:"none" }}
        {...layer(dismissing, "-120vh", 0.92, 0.06)}
      >
        <HoverImg
          src="/assets/decoration/rainbow.png"
          style={{ left:l(76), top:t(431), width:w(578), rotate:"-8deg", zIndex:1 }}
          entranceDelay={0.5}
        />
        <HoverImg
          src="/assets/flowers/green-orchid.png"
          style={{ left:l(770), top:t(355), width:w(260), zIndex:2 }}
          entranceDelay={0.45}
        />
        <HoverImg
          src="/assets/flowers/pink-lily.png"
          style={{ left:l(451), top:t(595), width:w(150), rotate:"-71deg", zIndex:2 }}
          entranceDelay={0.6}
        />
        <HoverImg
          src="/assets/letters/bedazzled-m.png"
          style={{ left:l(768), top:t(513), width:w(253), zIndex:4 }}
          entranceDelay={0.7}
          hoverScale={1.08}
        />
      </motion.div>

      {/* ── Me photo & shadow — rise on dismiss, mixBlendMode toggled to avoid black ── */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <motion.img
          src="/assets/photos/me-shadow.png"
          className="scene-element"
          style={{ pointerEvents:"none", left:cx(409), top:cy(578), width:w(409), mixBlendMode:"overlay", zIndex:3 }}
          initial={{ opacity:0 }}
          animate={{ opacity: dismissing ? 0 : 1, y: dismissing ? "-120vh" : 0 }}
          transition={{ duration: dismissing ? 0.3 : 0.8, delay: dismissing ? 0.06 : 0.35, ease: dismissing ? [0.4,0,1,1] : "easeOut" }}
          alt=""
        />
        <motion.img
          src="/assets/photos/me.png"
          className="scene-element"
          style={{ pointerEvents:"none", left:cx(354), top:cy(500), width:w(354), zIndex:5 }}
          initial={{ opacity:0, scale:0.95 }}
          animate={{ opacity:1, scale: dismissing ? 1 : 1, y: dismissing ? "-120vh" : 0 }}
          transition={{ duration: dismissing ? 0.92 : 0.6, delay: dismissing ? 0.06 : 0.4, ease: dismissing ? [0.4,0,1,1] : "backOut" }}
          alt="Me"
        />
      </div>

      {/* ── Layer 3: Stickers & flowers — medium-fast ───────────────────── */}
      <motion.div
        style={{ position:"absolute", inset:0, pointerEvents:"none" }}
        {...layer(dismissing, "-120vh", 0.76, 0.02)}
      >
        <HoverImg
          src="/assets/flowers/spotted-lily.png"
          style={{ left:l(1009), top:t(16), width:w(397), zIndex:6 }}
          entranceDelay={0.2}
        />
        <motion.img
          src="/assets/decoration/silver-star.png"
          className="scene-element"
          style={{ pointerEvents:"auto", left:l(64), top:t(157), width:w(139), zIndex:6 }}
          initial={{ opacity:0, scale:0.5 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ opacity:{ duration:0.4, delay:0.1 }, scale:{ duration:0.4, delay:0.1, ease:"backOut" } }}
          whileHover={{ scale:1.2, rotate:180, transition:{ duration:0.5 } }}
          alt=""
        />
        <HoverImg
          src="/assets/decoration/cat-1.png"
          style={{ left:l(131), top:t(230), width:w(143), zIndex:6 }}
          entranceDelay={0.15}
          hoverScale={1.15}
        />
        <HoverImg
          src="/assets/decoration/silver-heart.png"
          style={{ left:l(475), top:t(142), width:w(179), rotate:"26deg", zIndex:6 }}
          entranceDelay={0.25}
        />
        <HoverImg
          src="/assets/decoration/blue-heart.png"
          style={{ left:l(1060), top:t(833), width:w(155), rotate:"-17deg", zIndex:6 }}
          entranceDelay={0.9}
        />
        <HoverImg
          src="/assets/decoration/pink-double-star.png"
          style={{ left:l(1156), top:t(859), width:w(134), rotate:"6deg", zIndex:6 }}
          entranceDelay={0.8}
          hoverScale={1.15}
        />
      </motion.div>

      {/* ── Layer 4: Letters — fastest ──────────────────────────────────── */}
      <motion.div
        style={{ position:"absolute", inset:0, zIndex:10, pointerEvents:"none" }}
        {...layer(dismissing, "-120vh", 0.62, 0)}
      >
        <motion.div className="parallax-layer" style={{ x:x3, y:y3 }}>
          <LetterWord letters={welcomeLetters}   startDelay={0}    />
          <LetterWord letters={toLetters}        startDelay={0.38} delayStep={0.06} />
          <LetterWord letters={myLetters}        startDelay={0.55} />
          <LetterWord letters={portfolioLetters} startDelay={0.60} />
        </motion.div>
      </motion.div>

    </div>
  );
}
