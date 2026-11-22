import { useState } from 'react';
import { MASCOT_FACTS } from '../data/portfolioData';
import { playKeyDown, playKeyUp } from '../utils/keySound';

const REACTIONS = ['ROAR!', '</>', 'SHIP IT!', 'GG!', '120Hz', 'BOOM!'];
const SPARK_COLORS = ['#DC2626', '#111111', '#EF4444', '#FFFFFF'];

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
  const isRoaring = clicks % 2 === 1;

  const handleTap = () => {
    const next = clicks + 1;
    setClicks(next);

    // Spawn 10 lightweight GPU 8-bit pixel sparks around keycap
    const baseId = Date.now() + next * 100;
    const burst: Spark[] = Array.from({ length: 10 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 10 + (Math.random() * 0.35 - 0.175);
      const dist = 88 + Math.random() * 44;
      return {
        id: baseId + i,
        tx: `${Math.round(Math.cos(angle) * dist)}px`,
        ty: `${Math.round(Math.sin(angle) * dist)}px`,
        color: SPARK_COLORS[i % SPARK_COLORS.length],
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
          aria-label="Interactive mechanical dinosaur keycap — click for fun facts about Adrian"
        >
          <img
            src={isRoaring ? '/assets/dino-roar.jpg' : '/assets/dino-mascot.jpg'}
            alt={isRoaring ? 'Hyped roaring developer dinosaur mascot' : 'Happy developer dinosaur mascot'}
            className="mascot-img"
            draggable={false}
          />
          <link rel="preload" as="image" href="/assets/dino-roar.jpg" />

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
