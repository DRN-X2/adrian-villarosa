import { useState } from 'react';
import { MASCOT_FACTS } from '../data/portfolioData';

const REACTIONS = ['ROAR!', '</>', 'SHIP IT!', 'GG!', '120Hz', 'BOOM!'];

export function CluckyMascot() {
  const [clicks, setClicks] = useState(0);
  const [bouncing, setBouncing] = useState(false);

  const fact = MASCOT_FACTS[clicks % MASCOT_FACTS.length];
  const reaction = REACTIONS[clicks % REACTIONS.length];
  const isRoaring = clicks % 2 === 1;

  const handleTap = () => {
    setClicks((c) => c + 1);
    setBouncing(false);
    requestAnimationFrame(() => setBouncing(true));
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

      <button
        type="button"
        onClick={handleTap}
        className={`mascot-btn mascot-btn-img ${bouncing ? 'is-bouncing' : ''}`}
        onAnimationEnd={() => setBouncing(false)}
        aria-label="Interactive developer dinosaur mascot — click for fun facts about Adrian"
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

      <div className="mascot-bubble" key={clicks} aria-live="polite">
        <span className="bubble-dot" />
        <p>{fact}</p>
      </div>
    </div>
  );
}
