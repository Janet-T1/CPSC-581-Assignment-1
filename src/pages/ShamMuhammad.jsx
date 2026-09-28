import { useState, useMemo } from "react";

// seasonal rim button - cycles winter/spring/summer/autumn
const STAGES = [
  { label: "Winter", bg1: "#0a0e18", bg2: "#1a2440", glow: "rgba(140,180,255,0.08)" },
  { label: "Spring", bg1: "#0e1410", bg2: "#1a3028", glow: "rgba(120,200,140,0.10)" },
  { label: "Summer", bg1: "#0c1a10", bg2: "#143a1a", glow: "rgba(80,220,80,0.12)" },
  { label: "Autumn", bg1: "#18100a", bg2: "#3a2010", glow: "rgba(220,140,40,0.12)" },
];

// deterministic random so leaves dont change on re-render
function rand(seed) {
  let x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function makeStars(n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({
      x: rand(i * 3 + 1) * 100,
      y: rand(i * 7 + 2) * 100,
      size: 1 + rand(i * 11 + 3) * 2,
      opacity: 0.3 + rand(i * 13 + 5) * 0.5,
      delay: rand(i * 17 + 7) * 4,
    });
  }
  return out;
}

const STARS = makeStars(60);
const SPOKES = 10;
const FORK_ANGLE = 0.28;
const CX = 200, CY = 200;

function MeshSpokes({ stage }) {
  const spokes = [];

  const colors = [
    { main: "#7888a0", hi: "#9aaabe", lo: "#4a5a70", cross: "#5a6a80", crossHi: "#7a8a9e" },
    { main: "#6a8a58", hi: "#8aaa78", lo: "#3a5a30", cross: "#4a6a3e", crossHi: "#6a8a5e" },
    { main: "#4a8a38", hi: "#6aaa58", lo: "#2a5a1a", cross: "#2a6a28", crossHi: "#4a8a48" },
    { main: "#9a7a48", hi: "#ba9a68", lo: "#5a4a20", cross: "#7a5a2e", crossHi: "#9a7a4e" },
  ];
  const c = colors[stage];

  // draws a line with highlight + shadow edges for 3d look
  function bevel(key, x1, y1, x2, y2, col, hi, lo, w) {
    const dx = y2 - y1, dy = -(x2 - x1);
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = (dx / len) * (w * 0.3), ny = (dy / len) * (w * 0.3);
    spokes.push(
      <line key={`${key}s`} x1={x1+nx} y1={y1+ny} x2={x2+nx} y2={y2+ny}
        stroke={lo} strokeWidth={w} strokeLinecap="round" opacity={0.6} />,
      <line key={key} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={col} strokeWidth={w} strokeLinecap="round" />,
      <line key={`${key}h`} x1={x1-nx} y1={y1-ny} x2={x2-nx} y2={y2-ny}
        stroke={hi} strokeWidth={w * 0.4} strokeLinecap="round" opacity={0.3} />
    );
  }

  for (let i = 0; i < SPOKES; i++) {
    const ang = (i * 360) / SPOKES;
    const rad = (ang * Math.PI) / 180;
    const sx = CX + 32 * Math.cos(rad), sy = CY + 32 * Math.sin(rad);
    const mx = CX + 80 * Math.cos(rad), my = CY + 80 * Math.sin(rad);

    bevel(`ps${i}`, sx, sy, mx, my, c.main, c.hi, c.lo, 4.5);

    const r1 = rad + FORK_ANGLE, r2 = rad - FORK_ANGLE;
    const ex1 = CX + 146 * Math.cos(r1), ey1 = CY + 146 * Math.sin(r1);
    const ex2 = CX + 146 * Math.cos(r2), ey2 = CY + 146 * Math.sin(r2);

    bevel(`f1${i}`, mx, my, ex1, ey1, c.main, c.hi, c.lo, 3);
    bevel(`f2${i}`, mx, my, ex2, ey2, c.main, c.hi, c.lo, 3);

    // cross links between forks
    const nextRad = (((i + 1) % SPOKES) * 360 / SPOKES) * Math.PI / 180;
    bevel(`cl${i}`, ex1, ey1,
      CX + 146 * Math.cos(nextRad - FORK_ANGLE),
      CY + 146 * Math.sin(nextRad - FORK_ANGLE),
      c.cross, c.crossHi, c.lo, 2.2);

    // mid cross mesh
    const mr = 113;
    bevel(`mc${i}`,
      CX + mr * Math.cos(r1), CY + mr * Math.sin(r1),
      CX + mr * Math.cos(nextRad - FORK_ANGLE), CY + mr * Math.sin(nextRad - FORK_ANGLE),
      c.cross, c.crossHi, c.lo, 1.8);

    const prevRad = ((((i - 1 + SPOKES) % SPOKES) * 360) / SPOKES) * Math.PI / 180;
    bevel(`mc2${i}`,
      CX + mr * Math.cos(r2), CY + mr * Math.sin(r2),
      CX + mr * Math.cos(prevRad + FORK_ANGLE), CY + mr * Math.sin(prevRad + FORK_ANGLE),
      c.cross, c.crossHi, c.lo, 1.8);

    // inner web near hub
    const iwr = 58;
    spokes.push(
      <line key={`iw${i}`}
        x1={CX + iwr * Math.cos(r1)} y1={CY + iwr * Math.sin(r1)}
        x2={CX + iwr * Math.cos(nextRad - FORK_ANGLE)} y2={CY + iwr * Math.sin(nextRad - FORK_ANGLE)}
        stroke={c.cross} strokeWidth={1.2} strokeLinecap="round" opacity={0.35} />
    );
  }
  return <g>{spokes}</g>;
}

function Foliage({ stage, leafKey }) {
  const leaves = [];
  const count = [3, 5, 10, 8][stage];
  const colors = [
    ["#c8ddf0", "#b0cce8", "#e0eeff", "#a0c0e0"],
    ["#f2a0c8", "#e888b0", "#f5c0d8", "#7abf5c", "#8fcf6c"],
    ["#3a8a30", "#2d7a2e", "#4a9a3a", "#228822", "#60aa50"],
    ["#d4682a", "#c85a1e", "#e8943a", "#b84414", "#daa040"],
  ][stage];

  for (let i = 0; i < SPOKES; i++) {
    const ang = (i * 360) / SPOKES;
    const rad = (ang * Math.PI) / 180;

    for (let j = 0; j < count; j++) {
      const sub = rad + (j % 2 === 0 ? FORK_ANGLE : -FORK_ANGLE);
      const dist = 45 + (j / count) * 100;
      const jit = ((j % 3) - 1) * 0.15;
      const lx = CX + dist * Math.cos(sub + jit);
      const ly = CY + dist * Math.sin(sub + jit);
      const sz = 4 + rand(i * 100 + j + stage * 500) * 5;
      const rot = ang + (j % 2 === 0 ? 40 : -40) + rand(i * 50 + j) * 20;
      const fill = colors[Math.floor(rand(i * 77 + j * 33) * colors.length)];
      const del = j * 45 + i * 60;

      if (stage === 0) {
        // frost dots
        leaves.push(
          <circle key={`l${i}-${j}`} cx={lx} cy={ly} r={sz * 0.4}
            fill={fill} opacity={0}
            style={{ animation: `leafGrow 0.5s ease-out ${del}ms forwards` }} />
        );
      } else if (stage === 1) {
        // petals
        leaves.push(
          <ellipse key={`l${i}-${j}`} cx={lx} cy={ly} rx={sz} ry={sz * 0.5}
            fill={fill} opacity={0} transform={`rotate(${rot} ${lx} ${ly})`}
            style={{ animation: `leafGrow 0.6s ease-out ${del}ms forwards` }} />
        );
      } else {
        // leaf shapes
        const s = sz * 1.2;
        leaves.push(
          <path key={`l${i}-${j}`}
            d={`M ${lx} ${ly-s*.3} Q ${lx+s} ${ly-s*.5} ${lx+s*.1} ${ly+s*.4} Q ${lx-s*.2} ${ly+s*.2} ${lx} ${ly-s*.3} Z`}
            fill={fill} opacity={0} transform={`rotate(${rot} ${lx} ${ly})`}
            style={{ animation: `leafGrow 0.7s ease-out ${del}ms forwards` }} />
        );
      }
    }
  }
  return <g key={`fol-${leafKey}`}>{leaves}</g>;
}

function ShamMuhammad() {
  const [stage, setStage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [spin, setSpin] = useState(0);
  const [leafKey, setLeafKey] = useState(0);

  const cur = STAGES[stage];

  function handleClick() {
    if (animating) return;
    setAnimating(true);
    setSpin(s => s + 36);
    setTimeout(() => {
      setStage(s => (s >= STAGES.length - 1 ? 0 : s + 1));
      setLeafKey(k => k + 1);
      setAnimating(false);
    }, 600);
  }

  // falling stuff - snow in winter, leaves in autumn
  const particles = useMemo(() => {
    if (stage === 0) {
      // snow
      return Array.from({ length: 25 }).map((_, i) => (
        <div key={`sn${i}`} className="absolute pointer-events-none rounded-full"
          style={{
            left: `${5 + rand(i * 7) * 90}%`, top: `-${3 + rand(i*31)*5}px`,
            width: `${3 + rand(i*31)*5}px`, height: `${3 + rand(i*31)*5}px`,
            backgroundColor: "#e8f0ff", opacity: 0.4,
            animation: `petalFall ${5 + rand(i*19)*6}s linear ${rand(i*13)*6}s infinite`,
          }} />
      ));
    }
    if (stage === 3) {
      // falling leaves
      const leafColors = ["#d4682a", "#c85a1e", "#e8943a", "#daa040"];
      return Array.from({ length: 30 }).map((_, i) => (
        <div key={`fl${i}`} className="absolute pointer-events-none"
          style={{
            left: `${5 + rand(i * 7) * 90}%`, top: `-${5 + rand(i*31)*10}px`,
            width: `${5 + rand(i*31)*10}px`, height: `${(5 + rand(i*31)*10) * 0.6}px`,
            backgroundColor: leafColors[i % 4],
            borderRadius: "50% 50% 50% 0", opacity: 0.5,
            animation: `petalFall ${4 + rand(i*19)*5}s ease-in ${rand(i*13)*6}s infinite`,
          }} />
      ));
    }
    return null;
  }, [stage]);

  return (
    <div className="relative flex flex-col min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${cur.bg2}, ${cur.bg1})`,
        transition: "background 1.2s ease",
      }}>

      {/* stars */}
      {STARS.map((s, i) => (
        <div key={`st${i}`} className="absolute rounded-full pointer-events-none"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: `${s.size}px`, height: `${s.size}px`,
            backgroundColor: "white",
            opacity: stage === 0 ? s.opacity : stage === 3 ? s.opacity * 0.4 : s.opacity * 0.2,
            transition: "opacity 1s",
            animation: `twinkle ${2 + s.delay}s ease-in-out ${s.delay}s infinite alternate`,
          }} />
      ))}

      {particles}

      {/* glow behind rim */}
      <div className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: `radial-gradient(circle, ${cur.glow}, transparent 70%)`,
          transition: "background 1s",
        }} />

      <p className="relative text-white/40 text-[11px] tracking-[0.35em] uppercase mb-10"
        style={{ fontFamily: "'Courier New', monospace" }}>
        {cur.label}
      </p>

      {/* the button */}
      <button onClick={handleClick} disabled={animating}
        className="relative cursor-pointer focus:outline-none"
        style={{ width: 360, height: 360 }}>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{
            filter: `drop-shadow(0 0 40px ${cur.glow})`,
            transform: `rotate(${spin}deg)`,
            transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), filter 1s",
          }}>
          <defs>
            <radialGradient id="tireGrad" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#1e1e22" />
              <stop offset="80%" stopColor="#111114" />
              <stop offset="100%" stopColor="#0a0a0c" />
            </radialGradient>
            <radialGradient id="sideGrad" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#1a1a1e" />
              <stop offset="50%" stopColor="#111114" />
              <stop offset="100%" stopColor="#0a0a0c" />
            </radialGradient>
            <radialGradient id="rimFace" cx="42%" cy="38%" r="58%">
              <stop offset="0%" stopColor="#2e2e36" />
              <stop offset="60%" stopColor="#1a1a20" />
              <stop offset="100%" stopColor="#111116" />
            </radialGradient>
            <radialGradient id="hubGrad" cx="42%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#3a3a42" />
              <stop offset="100%" stopColor="#1e1e24" />
            </radialGradient>
            <linearGradient id="lipGrad" x1="0" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#6a6a72" />
              <stop offset="30%" stopColor="#505058" />
              <stop offset="60%" stopColor="#38383e" />
              <stop offset="100%" stopColor="#56565e" />
            </linearGradient>
            <linearGradient id="lipShine" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="40%" stopColor="white" stopOpacity="0" />
              <stop offset="70%" stopColor="white" stopOpacity="0.08" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* tire */}
          <circle cx={CX} cy={CY} r={198} fill="url(#sideGrad)" />
          <circle cx={CX} cy={CY} r={198} fill="none" stroke="#0a0a0c" strokeWidth={1.5} />

          {/* tread - outer blocks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a1 = (i * 10 * Math.PI) / 180;
            const a2 = ((i * 10 + 7) * Math.PI) / 180;
            return (
              <path key={`t${i}`}
                d={`M ${CX+190*Math.cos(a1)} ${CY+190*Math.sin(a1)} L ${CX+199*Math.cos(a1)} ${CY+199*Math.sin(a1)} A 199 199 0 0 1 ${CX+199*Math.cos(a2)} ${CY+199*Math.sin(a2)} L ${CX+190*Math.cos(a2)} ${CY+190*Math.sin(a2)} A 190 190 0 0 0 ${CX+190*Math.cos(a1)} ${CY+190*Math.sin(a1)} Z`}
                fill="#1c1c1e" stroke="#101012" strokeWidth={0.4} />
            );
          })}

          {/* tread - inner blocks (offset) */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a1 = ((i * 10 + 5) * Math.PI) / 180;
            const a2 = ((i * 10 + 9) * Math.PI) / 180;
            return (
              <path key={`t2${i}`}
                d={`M ${CX+186*Math.cos(a1)} ${CY+186*Math.sin(a1)} L ${CX+191*Math.cos(a1)} ${CY+191*Math.sin(a1)} A 191 191 0 0 1 ${CX+191*Math.cos(a2)} ${CY+191*Math.sin(a2)} L ${CX+186*Math.cos(a2)} ${CY+186*Math.sin(a2)} A 186 186 0 0 0 ${CX+186*Math.cos(a1)} ${CY+186*Math.sin(a1)} Z`}
                fill="#191919" stroke="#101012" strokeWidth={0.3} />
            );
          })}

          {/* groove between tread rows */}
          <circle cx={CX} cy={CY} r={190} fill="none" stroke="#0e0e10" strokeWidth={1.2} />

          {/* sidewall detail */}
          <circle cx={CX} cy={CY} r={183} fill="none" stroke="#17171a" strokeWidth={0.7} />
          <circle cx={CX} cy={CY} r={178} fill="none" stroke="#151518" strokeWidth={0.4} />
          <circle cx={CX} cy={CY} r={173} fill="none" stroke="#17171a" strokeWidth={0.4} />
          <circle cx={CX} cy={CY} r={168} fill="none" stroke="#151518" strokeWidth={0.3} />
          <circle cx={CX} cy={CY} r={180} fill="none" stroke="#1e1e22" strokeWidth={1.8} strokeDasharray="8 4 3 4" opacity={0.5} />
          <circle cx={CX} cy={CY} r={163} fill="none" stroke="#1a1a1e" strokeWidth={2} />

          {/* bead */}
          <circle cx={CX} cy={CY} r={158} fill="#0c0c0e" />
          <circle cx={CX} cy={CY} r={158} fill="none" stroke="#1e1e22" strokeWidth={1} />

          {/* rim lip */}
          <circle cx={CX} cy={CY} r={155} fill="none" stroke="url(#lipGrad)" strokeWidth={5} />
          <circle cx={CX} cy={CY} r={155} fill="none" stroke="url(#lipShine)" strokeWidth={5} />
          <circle cx={CX} cy={CY} r={151.5} fill="none" stroke="#38383e" strokeWidth={1.2} />

          {/* rim face */}
          <circle cx={CX} cy={CY} r={150} fill="url(#rimFace)" />
          <circle cx={CX} cy={CY} r={148} fill="none" stroke="#3a3a42" strokeWidth={0.5} opacity={0.5} />
          <circle cx={CX} cy={CY} r={143} fill="none" stroke="#2a2a30" strokeWidth={0.3} opacity={0.3} />

          <MeshSpokes stage={stage} />
          <Foliage stage={stage} leafKey={leafKey} />

          {/* hub */}
          <circle cx={CX} cy={CY} r={28} fill="url(#hubGrad)" stroke="#444448" strokeWidth={2} />
          <circle cx={CX} cy={CY} r={22} fill="none" stroke="#3a3a40" strokeWidth={0.8} opacity={0.4} />

          {/* sun/moon - counter-rotate so it stays upright */}
          <g transform={`rotate(${-spin} ${CX} ${CY})`}
            style={{ transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            {stage === 0 && (
              <g>
                <circle cx={CX} cy={CY} r={9} fill="#c8d8f0" />
                <circle cx={CX+4} cy={CY-3} r={8} fill="url(#hubGrad)" />
                <circle cx={CX-7} cy={CY-6} r={1} fill="#e0e8ff" opacity={0.7} />
                <circle cx={CX+6} cy={CY+7} r={0.8} fill="#e0e8ff" opacity={0.5} />
                <circle cx={CX-5} cy={CY+5} r={0.6} fill="#e0e8ff" opacity={0.6} />
              </g>
            )}
            {stage === 1 && (
              <g>
                <circle cx={CX} cy={CY} r={7} fill="#f5c96a" />
                <circle cx={CX} cy={CY} r={10} fill="#f5c96a" opacity={0.15} />
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i * 45 * Math.PI) / 180;
                  return <line key={`r${i}`} x1={CX+9*Math.cos(a)} y1={CY+9*Math.sin(a)}
                    x2={CX+13*Math.cos(a)} y2={CY+13*Math.sin(a)}
                    stroke="#f5c96a" strokeWidth={1.2} strokeLinecap="round" opacity={0.6} />;
                })}
              </g>
            )}
            {stage === 2 && (
              <g>
                <circle cx={CX} cy={CY} r={8} fill="#ffd23f" />
                <circle cx={CX} cy={CY} r={13} fill="#ffd23f" opacity={0.1} />
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i * 30 * Math.PI) / 180;
                  return <line key={`r${i}`} x1={CX+10*Math.cos(a)} y1={CY+10*Math.sin(a)}
                    x2={CX+(i%2===0?16:14)*Math.cos(a)} y2={CY+(i%2===0?16:14)*Math.sin(a)}
                    stroke="#ffd23f" strokeWidth={i%2===0?1.5:1} strokeLinecap="round" opacity={0.7} />;
                })}
              </g>
            )}
            {stage === 3 && (
              <g>
                <circle cx={CX} cy={CY} r={8} fill="#e07828" />
                <circle cx={CX} cy={CY} r={12} fill="#e07828" opacity={0.12} />
                {Array.from({ length: 8 }).map((_, i) => {
                  const a = (i * 45 * Math.PI) / 180;
                  return <line key={`r${i}`} x1={CX+9*Math.cos(a)} y1={CY+9*Math.sin(a)}
                    x2={CX+12*Math.cos(a)} y2={CY+12*Math.sin(a)}
                    stroke="#e07828" strokeWidth={1} strokeLinecap="round" opacity={0.4} />;
                })}
              </g>
            )}
          </g>

          {/* lug nuts */}
          {Array.from({ length: 5 }).map((_, i) => {
            const a = ((i * 72 - 90) * Math.PI) / 180;
            const lx = CX + 15 * Math.cos(a), ly = CY + 15 * Math.sin(a);
            return (
              <g key={`lg${i}`}>
                <circle cx={lx} cy={ly} r={4} fill="#28282e" stroke="#4a4a50" strokeWidth={0.8} />
                <circle cx={lx-0.8} cy={ly-0.8} r={1.5} fill="white" opacity={0.06} />
              </g>
            );
          })}

          <ellipse cx={CX-4} cy={CY-5} rx={8} ry={5} fill="white" opacity={0.04} />
        </svg>
      </button>

      <p className="relative text-white/25 text-[10px] mt-10 tracking-[0.2em]"
        style={{ fontFamily: "'Courier New', monospace" }}>
        {stage < STAGES.length - 1 ? "click the rim" : "click to restart"}
      </p>

      <a href="/" className="absolute top-6 left-6 text-white/25 hover:text-white/50 text-[11px] tracking-wider no-underline"
        style={{ fontFamily: "'Courier New', monospace", transition: "color 0.3s" }}>
        ← back
      </a>

      <style>{`
        @keyframes leafGrow {
          from { opacity: 0; transform: scale(0.15); }
          to { opacity: 0.9; transform: scale(1); }
        }
        @keyframes petalFall {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
          8% { opacity: 0.5; }
          85% { opacity: 0.3; }
          100% { transform: translateY(100vh) rotate(540deg) scale(0.6); opacity: 0; }
        }
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

export default ShamMuhammad;