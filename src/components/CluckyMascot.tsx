import { useState } from 'react';
import { MASCOT_FACTS } from '../data/portfolioData';
import { playKeyDown, playKeyUp } from '../utils/keySound';

const REACTIONS = ['ROAR!', '</>', 'SHIP IT!', 'GG!', '120Hz', 'BOOM!'];
const GOOGLE_SPARKS = ['#EA4335', '#4285F4', '#FBBC05', '#34A853'];

// Cycles: Grey-White -> Google Red -> Google Blue -> Google Yellow -> Google Green
const KEYCAP_THEMES = [
  { bg: '#EBEBEB', lip: '#B8B8BE', border: '#D4D4D8' }, // Grey-White
  { bg: '#EA4335', lip: '#B3261E', border: '#F28B82' }, // Google Red
  { bg: '#4285F4', lip: '#1967D2', border: '#8AB4F8' }, // Google Blue
  { bg: '#FBBC05', lip: '#C58B00', border: '#FDE293' }, // Google Yellow
  { bg: '#34A853', lip: '#188038', border: '#81C995' }, // Google Green
];

// 5 distinct expressive poses (zero awkward sideways tilt)
const DINO_POSES = [
  { src: '/assets/dino-happy.png', transform: 'scaleX(1)', alt: 'Happy developer dinosaur' },
  { src: '/assets/dino-roar.png', transform: 'scaleX(1)', alt: 'Hyped roaring dinosaur' },
  { src: '/assets/dino-happy.png', transform: 'scaleX(-1)', alt: 'Curious dinosaur looking left' },
  { src: '/assets/dino-roar.png', transform: 'scaleX(-1) translateY(-6px) scale(1.06)', alt: 'Jumping roaring dinosaur' },
  { src: '/assets/dino-roar.png', transform: 'scaleX(1) translateY(-7px) scale(1.08)', alt: 'Super hype dinosaur jump' },
];

interface Spark {
  id: number;
  tx: string;
  ty: string;
  color: string;
}

export function CluckyMascot() {
  const [clicks, setClicks] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const fact = MASCOT_FACTS[clicks % MASCOT_FACTS.length];
  const reaction = REACTIONS[clicks % REACTIONS.length];
  const theme = KEYCAP_THEMES[clicks % KEYCAP_THEMES.length];
  const pose = DINO_POSES[clicks % DINO_POSES.length];

  const handleTap = () => {
    const next = clicks + 1;
    setClicks(next);

    const baseId = Date.now() + next * 100;
    const burst: Spark[] = Array.from({ length: 12 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() * 0.35 - 0.175);
      const dist = 90 + Math.random() * 46;
      return {
        id: baseId + i,
        tx: `${Math.round(Math.cos(angle) * dist)}px`,
        ty: `${Math.round(Math.sin(angle) * dist)}px`,
        color: GOOGLE_SPARKS[i % GOOGLE_SPARKS.length],
      };
    });
    setSparks(burst);
  };

  return (
    <div className="mascot-wrap">
      <div className="mascot-cue" aria-hidden="true">
        <span>Hey, click me!</span>
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
          <path
            d="M3 4C11 3 19 8 22 19M22 19L15 16M22 19L24 11"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="mascot-spark-stage">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="spark-pixel"
            style={
              {
                '--tx': s.tx,
                '--ty': s.ty,
                backgroundColor: s.color,
              } as React.CSSProperties
            }
            aria-hidden="true"
          />
        ))}

        <button
          type="button"
          onPointerDown={() => playKeyDown('heavy')}
          onPointerUp={() => playKeyUp()}
          onClick={handleTap}
          className="mascot-btn mascot-keycap"
          style={
            {
              '--key-bg': theme.bg,
              '--key-lip': theme.lip,
              '--key-border': theme.border,
            } as React.CSSProperties
          }
          aria-label="Interactive Google-color mechanical dinosaur keycap — click to change color and pose"
        >
          <img
            src={pose.src}
            alt={pose.alt}
            className="mascot-img"
            style={{ transform: pose.transform }}
            draggable={false}
          />
          <link rel="preload" as="image" href="/assets/dino-roar.png" />

          {clicks > 0 && (
            <span key={clicks} className="mascot-pop-tag" aria-hidden="true">
              {reaction}
            </span>
          )}
          {clicks > 0 && <span className="mascot-counter">×{clicks}</span>}
        </button>
      </div>

      <div className="mascot-bubble" key={clicks} aria-live="polite">
        <span className="bubble-dot" />
        <p>{fact}</p>
      </div>
    </div>
  );
}
