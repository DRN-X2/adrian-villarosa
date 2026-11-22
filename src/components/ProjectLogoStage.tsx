import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { LogoVariant } from '../data/portfolioData';

interface Props {
  title: string;
  variants: LogoVariant[];
  compact?: boolean;
}

export function ProjectLogoStage({ title, variants, compact = false }: Props) {
  const [idx, setIdx] = useState(0);
  const [popping, setPopping] = useState(false);

  const current = variants[idx % variants.length];
  const canToggle = variants.length > 1;

  const handleSwitch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canToggle) return;
    setIdx((prev) => (prev + 1) % variants.length);
    setPopping(false);
    requestAnimationFrame(() => setPopping(true));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleSwitch}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          setIdx((prev) => (prev + 1) % variants.length);
        }
      }}
      className={`logo-stage ${compact ? 'logo-stage-compact' : ''} ${
        current.dark ? 'is-dark' : 'is-light'
      } ${current.fullBleed ? 'is-fullbleed' : ''}`}
      style={{ backgroundColor: current.bg }}
      aria-label={`Switch ${title} logo theme (current: ${current.label})`}
      title="Tap to switch logo style"
    >
      <img
        src={current.src}
        alt={`${title} logo (${current.label})`}
        className={`logo-stage-img ${popping ? 'is-popping' : ''}`}
        onAnimationEnd={() => setPopping(false)}
        loading="lazy"
      />

      {canToggle && (
        <span className="logo-stage-pill">
          <RefreshCw size={11} /> {current.label}
        </span>
      )}
    </div>
  );
}
