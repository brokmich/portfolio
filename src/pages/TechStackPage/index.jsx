import { useState } from "react";

const SKILL_GROUPS = [
  {
    category: "Frontend",
    color: "#C76D9A",
    noteColor: "#FFF0F6",
    stripe: "#F4B8D4",
    rotate: "-2.5deg",
    items: [
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS / SCSS",
      "Angular",
      "React",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    category: "Backend",
    color: "#5A9A25",
    noteColor: "#F2FAEB",
    stripe: "#B8E08A",
    rotate: "1.8deg",
    items: ["Node.js", "Express", "REST APIs", "GraphQL"],
  },
  {
    category: "Databases",
    color: "#00879A",
    noteColor: "#EBF8FA",
    stripe: "#88D8E4",
    rotate: "-1deg",
    items: ["PostgreSQL", "SQL"],
  },
  {
    category: "Tools",
    color: "#D46A00",
    noteColor: "#FFF5EB",
    stripe: "#FFB870",
    rotate: "2.2deg",
    items: ["Git", "Firebase", "AWS Cognito", "Jira"],
  },
  {
    category: "Design",
    color: "#7B4F9E",
    noteColor: "#F6F0FC",
    stripe: "#C9A8E8",
    rotate: "-1.8deg",
    items: ["Figma", "UX / UI", "Design Systems"],
  },
  {
    category: "Languages",
    color: "#9B6B1A",
    noteColor: "#FDF7ED",
    stripe: "#E8CA88",
    rotate: "1.2deg",
    items: ["Spanish (native)", "English (fluent)"],
  },
];

function SkillTag({ label, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12,
        color: hovered ? "#fff" : color,
        background: hovered ? color : `${color}18`,
        border: `1px solid ${color}55`,
        padding: "3px 10px",
        borderRadius: 20,
        transition: "all 0.15s ease",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        display: "inline-block",
        cursor: "default",
      }}
    >
      {label}
    </span>
  );
}

function StickyNote({ group }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: group.noteColor,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 14px 36px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.1)"
          : "0 4px 14px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.08)",
        transform: hovered
          ? "rotate(0deg) scale(1.04)"
          : `rotate(${group.rotate})`,
        transition:
          "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease",
        minWidth: 190,
        cursor: "default",
        zIndex: hovered ? 10 : 1,
        position: "relative",
      }}
    >
      <div style={{ height: 12, background: group.stripe }} />
      <div style={{ padding: "14px 18px 18px" }}>
        <div
          style={{
            fontFamily: "'Cedarville Cursive', cursive",
            fontSize: 20,
            color: group.color,
            marginBottom: 12,
            lineHeight: 1,
          }}
        >
          {group.category}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {group.items.map((skill, i) => (
            <SkillTag key={i} label={skill} color={group.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PageTechStack() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F7E7E8",
        backgroundImage:
          "linear-gradient(#FFF0F1 2px,transparent 2px),linear-gradient(90deg,#FFF0F1 2px,transparent 2px)",
        backgroundSize: "70px 70px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <img
        src="/assets/decoration/silver-star.png"
        alt=""
        className="float-b"
        style={{
          position: "absolute",
          left: 24,
          top: 24,
          width: 88,
          opacity: 0.8,
        }}
      />
      <img
        src="/assets/flowers/green-orchid.png"
        alt=""
        className="float-c"
        style={{
          position: "absolute",
          right: -10,
          bottom: 0,
          width: 220,
          opacity: 0.75,
        }}
      />
      <img
        src="/assets/flowers/pink-lily.png"
        alt=""
        style={{
          position: "absolute",
          left: -8,
          bottom: 10,
          width: 160,
          transform: "rotate(-30deg)",
          opacity: 0.65,
        }}
      />
      <img
        src="/assets/decoration/pink-double-star.png"
        alt=""
        className="float-a"
        style={{ position: "absolute", right: 44, top: 24, width: 104 }}
      />
      <img
        src="/assets/decoration/blue-heart.png"
        alt=""
        style={{
          position: "absolute",
          left: 60,
          bottom: 36,
          width: 82,
          transform: "rotate(-12deg)",
          opacity: 0.75,
        }}
      />
      <img
        src="/assets/about/star-4.png"
        alt=""
        className="float-b"
        style={{
          position: "absolute",
          right: 30,
          bottom: 60,
          width: 88,
          opacity: 0.7,
        }}
      />

      <div style={{ zIndex: 2, textAlign: "center", marginBottom: 18 }}>
        <div
          style={{
            fontFamily: "'Cedarville Cursive', cursive",
            fontSize: "clamp(22px,3vw,38px)",
            color: "#C76D9A",
            lineHeight: 1.2,
          }}
        >
          my tech stack
        </div>
        <div
          style={{
            height: 2,
            width: 120,
            background:
              "linear-gradient(90deg,transparent,#C76D9A,transparent)",
            margin: "6px auto 0",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(185px, 240px))",
          gap: "14px 18px",
          zIndex: 2,
          maxWidth: 840,
          padding: "0 24px",
        }}
      >
        {SKILL_GROUPS.map((g, i) => (
          <StickyNote key={i} group={g} />
        ))}
      </div>
    </div>
  );
}
