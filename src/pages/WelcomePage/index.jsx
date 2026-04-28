import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import "./WelcomePage.css";

// ── Helpers: convert Figma px (1440×1024) → responsive units ────────────────
const W = 1440,
  H = 1024;
const SCALE = 0.78;
const l = (px) => `${((px / W) * 100).toFixed(3)}%`;
const t = (px) => `${((px / H) * 100).toFixed(3)}%`;
const w = (px) => `${((px / W) * 100 * SCALE).toFixed(3)}vw`;
// vw-only helper: both axes scale with viewport width so letters stay together
const lvw = (px) => `${((px / W) * 100).toFixed(3)}vw`;
const cx = (widthPx) =>
  `calc(50% - ${(((widthPx / W) * 100 * SCALE) / 2).toFixed(3)}vw)`;
const cy = (heightPx) =>
  `calc(50% - ${(((heightPx / W) * 100 * SCALE) / 2).toFixed(3)}vw)`;

// ── Letter data ───────────────────────────────────────────────────────────────
const welcomeLetters = [
  { char: "W", left: 178, top: 174, rotate: 0, hoverR: -10 },
  { char: "E", left: 221, top: 185, rotate: 0, hoverR: 8 },
  { char: "L", left: 264, top: 182, rotate: -13, hoverR: -8 },
  { char: "C", left: 315, top: 185, rotate: 0, hoverR: 8 },
  { char: "O", left: 365, top: 177, rotate: 9, hoverR: 14 },
  { char: "M", left: 407, top: 179, rotate: -9, hoverR: -14 },
  { char: "E", left: 456, top: 185, rotate: 0, hoverR: 8 },
];

const toLetters = [
  { char: "T", left: 489, top: 338.32, rotate: -13, hoverR: -8 },
  { char: "O", left: 537, top: 339, rotate: 17, hoverR: 12 },
];

const myLetters = [
  { char: "M", left: 908, top: 728.29, rotate: -11, hoverR: -16 },
  { char: "Y", left: 954, top: 729, rotate: 7, hoverR: 12 },
];

const portfolioLetters = [
  { char: "P", left: 900, top: 894, rotate: 8, hoverR: 13 },
  { char: "O", left: 930, top: 864.09, rotate: -19, hoverR: -14 },
  { char: "R", left: 969, top: 848.33, rotate: -33, hoverR: -28 },
  { char: "T", left: 1019, top: 825.61, rotate: -5, hoverR: -10 },
  { char: "F", left: 1044, top: 800, rotate: 13, hoverR: 18 },
  { char: "O", left: 1092, top: 795.86, rotate: -14, hoverR: -19 },
  { char: "L", left: 1122, top: 754.59, rotate: -16, hoverR: -21 },
  { char: "I", left: 1154, top: 730.62, rotate: -8, hoverR: -13 },
  { char: "O", left: 1198, top: 716, rotate: 20, hoverR: 25 },
];

// ── Letter component ──────────────────────────────────────────────────────────
// leftCss / topCss are pre-computed CSS strings passed by LetterWord
function BounceLetterImg({ char, leftCss, topCss, rotate, hoverR, delay }) {
  return (
    <motion.div
      className="letter-wrapper"
      style={{ left: leftCss, top: topCss, rotate }}
      initial={{ opacity: 0, scale: 0.5, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{
        y: -10,
        scale: 1.2,
        rotate: hoverR,
        transition: { type: "spring", stiffness: 500, damping: 12 },
      }}
    >
      <motion.img
        src={`/assets/letters/${char}.png`}
        className="letter-img"
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2.8 + delay * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.2,
        }}
        alt={char}
      />
    </motion.div>
  );
}

// ── Word group: anchor at first letter, offsets in vw so all letters scale together
function LetterWord({ letters, startDelay = 0, delayStep = 0.05 }) {
  const anchor = letters[0];
  return (
    <div
      style={{
        position: "absolute",
        left: l(anchor.left),
        top: t(anchor.top),
        pointerEvents: "none",
      }}
    >
      {letters.map((letter, i) => (
        <BounceLetterImg
          key={i}
          {...letter}
          leftCss={lvw(letter.left - anchor.left)}
          topCss={lvw(letter.top - anchor.top)}
          delay={startDelay + delayStep * i}
        />
      ))}
    </div>
  );
}

// ── Decorative image: entrance fade + hover only ──────────────────────────────
function HoverImg({ src, style, entranceDelay = 0, hoverScale = 1.06 }) {
  return (
    <motion.img
      src={src}
      className="scene-element"
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.5, delay: entranceDelay },
        scale: { duration: 0.5, delay: entranceDelay, ease: "backOut" },
      }}
      whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
      alt=""
    />
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function WelcomePage() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 55, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 55, damping: 22 });

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  const x3 = useTransform(springX, (v) => v * 45);
  const y3 = useTransform(springY, (v) => v * 45);

  return (
    <div
      ref={containerRef}
      className="welcome-page"
      onMouseMove={handleMouseMove}
    >
      {/* ── Cheetah stripe ── */}
      <motion.img
        src="/assets/bg/cheetah-stripe.png"
        className="scene-element"
        style={{
          left: l(1272),
          top: t(-67),
          width: w(78),
          height: "130vh",
          objectFit: "cover",
          zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        alt=""
      />

      {/*
       * ── Central group ──────────────────────────────────────────────────────
       * Wrapper has position:absolute but NO z-index → does not create a
       * stacking context → mix-blend-mode on the shadow blends against the
       * page background (pink) instead of a transparent isolated layer.
       *
       * Dimensions: 100vw × 71.111vw (= 1024/1440 × 100vw) mirror the Figma
       * canvas aspect ratio, so l() and t() inside both resolve to vw units
       * and elements maintain their relative positions on any screen size.
       *
       * Vertical center: top = 50vh − half-height = 50vh − 35.556vw
       */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "calc(50vh - 35.556vw)",
          width: "100vw",
          height: "71.111vw",
        }}
      >
        {/* 1. Rainbow — furthest back */}
        <HoverImg
          src="/assets/decoration/rainbow.png"
          style={{
            left: l(76),
            top: t(431),
            width: w(578),
            rotate: "-8deg",
            zIndex: 1,
          }}
          entranceDelay={0.5}
        />

        {/* 2. Orchid */}
        <HoverImg
          src="/assets/flowers/green-orchid.png"
          style={{ left: l(770), top: t(355), width: w(260), zIndex: 2 }}
          entranceDelay={0.45}
        />

        {/* 2. Pink lily */}
        <HoverImg
          src="/assets/flowers/pink-lily.png"
          style={{
            left: l(451),
            top: t(595),
            width: w(150),
            rotate: "-71deg",
            zIndex: 2,
          }}
          entranceDelay={0.6}
        />

        {/* 3. Shadow — blend overlay */}
        <motion.img
          src="/assets/photos/me-shadow.png"
          className="scene-element"
          style={{
            left: cx(409),
            top: cy(578),
            width: w(409),
            mixBlendMode: "overlay",
            zIndex: 3,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          alt=""
        />

        {/* 4. Bedazzled M */}
        <HoverImg
          src="/assets/letters/bedazzled-m.png"
          style={{ left: l(768), top: t(513), width: w(253), zIndex: 4 }}
          entranceDelay={0.7}
          hoverScale={1.08}
        />

        {/* 5. Me photo — front */}
        <motion.img
          src="/assets/photos/me.png"
          className="scene-element"
          style={{ left: cx(354), top: cy(500), width: w(354), zIndex: 5 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
          alt="Me"
        />
      </div>

      {/* ── Decorative stickers (no parallax, hover only) ── */}

      <HoverImg
        src="/assets/flowers/spotted-lily.png"
        style={{ left: l(1009), top: t(16), width: w(397), zIndex: 6 }}
        entranceDelay={0.2}
      />

      {/* Silver star — special spin on hover */}
      <motion.img
        src="/assets/decoration/silver-star.png"
        className="scene-element"
        style={{ left: l(64), top: t(157), width: w(139), zIndex: 6 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.4, delay: 0.1 },
          scale: { duration: 0.4, delay: 0.1, ease: "backOut" },
        }}
        whileHover={{ scale: 1.2, rotate: 180, transition: { duration: 0.5 } }}
        alt=""
      />

      <HoverImg
        src="/assets/decoration/cat-1.png"
        style={{ left: l(131), top: t(230), width: w(143), zIndex: 6 }}
        entranceDelay={0.15}
        hoverScale={1.15}
      />

      <HoverImg
        src="/assets/decoration/silver-heart.png"
        style={{
          left: l(475),
          top: t(142),
          width: w(179),
          rotate: "26deg",
          zIndex: 6,
        }}
        entranceDelay={0.25}
      />

      <HoverImg
        src="/assets/decoration/blue-heart.png"
        style={{
          left: l(1060),
          top: t(833),
          width: w(155),
          rotate: "-17deg",
          zIndex: 6,
        }}
        entranceDelay={0.9}
      />

      <HoverImg
        src="/assets/decoration/pink-double-star.png"
        style={{
          left: l(1156),
          top: t(859),
          width: w(134),
          rotate: "6deg",
          zIndex: 6,
        }}
        entranceDelay={0.8}
        hoverScale={1.15}
      />

      {/* ── Letters — parallax + word groups ── */}
      <motion.div
        className="parallax-layer"
        style={{ x: x3, y: y3, zIndex: 10 }}
      >
        <LetterWord letters={welcomeLetters} startDelay={0} />
        <LetterWord letters={toLetters} startDelay={0.38} delayStep={0.06} />
        <LetterWord letters={myLetters} startDelay={0.55} />
        <LetterWord letters={portfolioLetters} startDelay={0.60} />
      </motion.div>
    </div>
  );
}
