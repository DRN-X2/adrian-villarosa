import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  Github,
  Image as ImageIcon,
  Layers,
  Palette,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';
import { playKeyDown, playKeyUp } from '../utils/keySound';
import { ProjectLogoStage } from './ProjectLogoStage';

type LensMode = 'all' | 'design' | 'engineering';

interface Props {
  project: ProjectItem;
  prevProject: ProjectItem;
  nextProject: ProjectItem;
  onBack: () => void;
  onNavigate: (projectId: string) => void;
  soundOn: boolean;
  onToggleSound: () => void;
}

export function ProjectCaseStudy({
  project,
  prevProject,
  nextProject,
  onBack,
  onNavigate,
  soundOn,
  onToggleSound,
}: Props) {
  const [lens, setLens] = useState<LensMode>('all');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ title: string; caption: string; src: string } | null>(null);

  const cs = project.caseStudy;
  if (!cs) return null;

  const showDesign = lens === 'all' || lens === 'design';
  const showEng = lens === 'all' || lens === 'engineering';

  const copyHex = async (hex: string) => {
    playKeyDown('normal');
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="page-shell cs-shell">
      {/* === STICKY TOP BAR === */}
      <header className="nav-wrap">
        <nav className="pill-nav cs-nav" aria-label="Case study navigation">
          <button
            type="button"
            onPointerDown={() => playKeyDown('normal')}
            onClick={onBack}
            className="nav-link cs-back-pill"
          >
            <ArrowLeft size={15} /> Portfolio
          </button>

          <span className="cs-nav-title">{project.title}</span>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="nav-link nav-resume"
              onPointerDown={() => playKeyDown('normal')}
            >
              <Github size={14} style={{ verticalAlign: -2, marginRight: 4 }} />
              Repo
            </a>
          )}

          <button
            type="button"
            onClick={onToggleSound}
            className="nav-sound-btn"
            aria-label={soundOn ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </nav>
      </header>

      <main className="cs-main">
        {/* === HERO BANNER === */}
        <section className="cs-hero">
          <div className="cs-hero-grid">
            <div className="cs-hero-copy">
              <div className="cs-meta-pills">
                <span className="badge badge-accent">{cs.projectType}</span>
                <span className="badge">{project.year}</span>
                <span className="badge">{cs.role}</span>
              </div>

              <h1 className="cs-title">{project.title}</h1>
              <p className="cs-tagline">{project.tagline}</p>
              <p className="cs-desc">{project.description}</p>

              <div className="cta-row" style={{ marginTop: 18 }}>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-dark keycap-btn keycap-dark"
                    onPointerDown={() => playKeyDown('normal')}
                    onPointerUp={() => playKeyUp()}
                  >
                    <Github size={17} /> View GitHub Repo
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary keycap-btn keycap-red"
                    onPointerDown={() => playKeyDown('normal')}
                    onPointerUp={() => playKeyUp()}
                  >
                    <ExternalLink size={17} /> Visit Live App
                  </a>
                )}
              </div>
            </div>

            {project.logoVariants && (
              <div className="cs-hero-logo">
                <ProjectLogoStage title={project.title} variants={project.logoVariants} />
                <span className="cs-logo-hint">Tap logo to switch theme</span>
              </div>
            )}
          </div>

          {/* Capstone / Competition Spotlight */}
          {cs.spotlight && (
            <div className="cs-spotlight">
              <div className="cs-spotlight-icon">
                <Trophy size={18} />
              </div>
              <div>
                <div className="cs-spotlight-kicker">{cs.spotlight.label}</div>
                <div className="cs-spotlight-title">{cs.spotlight.title}</div>
                <p className="cs-spotlight-desc">{cs.spotlight.detail}</p>
              </div>
            </div>
          )}

          {/* Metric Strip */}
          {cs.kpis.length > 0 && (
            <div className="metric-strip" style={{ marginBottom: 0 }}>
              {cs.kpis.map((k) => (
                <div key={k.label} className="metric-box">
                  <div className="metric-num">{k.value}</div>
                  <div className="metric-label">{k.label}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* === DUAL-LENS SWITCHER (Design vs Engineering Hiring Managers) === */}
        <div className="cs-lens-bar" role="tablist" aria-label="Switch case study focus">
          <button
            type="button"
            role="tab"
            aria-selected={lens === 'all'}
            onPointerDown={() => playKeyDown('normal')}
            onClick={() => setLens('all')}
            className={`filter-pill ${lens === 'all' ? 'is-active' : ''}`}
          >
            <Layers size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
            Full Case Study
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={lens === 'design'}
            onPointerDown={() => playKeyDown('normal')}
            onClick={() => setLens('design')}
            className={`filter-pill ${lens === 'design' ? 'is-active' : ''}`}
          >
            <Palette size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
            UI / UX Design
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={lens === 'engineering'}
            onPointerDown={() => playKeyDown('normal')}
            onClick={() => setLens('engineering')}
            className={`filter-pill ${lens === 'engineering' ? 'is-active' : ''}`}
          >
            <Code2 size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
            Backend &amp; Tech Stack
          </button>
        </div>

        {/* === PROBLEM & SOLUTION === */}
        <section className="cs-section">
          <div className="grid-2">
            <article className="card">
              <span className="section-kicker">01 · The Problem</span>
              <h2 className="card-title">Why we built it</h2>
              <p className="card-tagline" style={{ fontSize: '0.96rem', lineHeight: 1.6 }}>
                {cs.problem}
              </p>
            </article>
            <article className="card">
              <span className="section-kicker">02 · The Solution</span>
              <h2 className="card-title">How it works</h2>
              <p className="card-tagline" style={{ fontSize: '0.96rem', lineHeight: 1.6 }}>
                {cs.solution}
              </p>
            </article>
          </div>
        </section>

        {/* === UI / UX DESIGN SECTION === */}
        {showDesign && (
          <section className="cs-section">
            <div className="section-head">
              <div>
                <span className="section-kicker">UI / UX &amp; Product Design</span>
                <h2 className="section-title">Design &amp; Interface</h2>
              </div>
              <span className="badge">For Design &amp; Product Reviewers</span>
            </div>

            {/* UI Gallery Template (Ready for screenshots) */}
            <div className="cs-ui-grid">
              {cs.design.uiSlots.map((slot, idx) => (
                <div key={slot.title} className="card cs-ui-card">
                  {slot.image ? (
                    <button
                      type="button"
                      className="cs-ui-img-btn"
                      onClick={() =>
                        setLightboxImg({ title: slot.title, caption: slot.caption, src: slot.image! })
                      }
                    >
                      <img src={slot.image} alt={slot.title} className="cs-ui-img" loading="lazy" />
                    </button>
                  ) : (
                    <div className={`cs-ui-placeholder ${slot.device === 'mobile' ? 'is-mobile' : ''}`}>
                      <div className="cs-ui-frame-bar">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="cs-ui-placeholder-body">
                        <ImageIcon size={24} />
                        <strong>UI Screen #{idx + 1}</strong>
                        <span>{slot.device === 'mobile' ? 'Mobile Viewport' : 'Desktop Viewport'} · Ready for screenshot</span>
                      </div>
                    </div>
                  )}

                  <div className="card-top" style={{ marginTop: 4 }}>
                    <h3 className="card-title" style={{ fontSize: '1.12rem' }}>
                      {slot.title}
                    </h3>
                    <span className="badge">{slot.device === 'mobile' ? 'Mobile' : 'Web'}</span>
                  </div>
                  <p className="card-tagline">{slot.caption}</p>
                </div>
              ))}
            </div>

            {/* Design System Swatches + UX Decisions */}
            <div className="grid-2" style={{ marginTop: 16 }}>
              <article className="card">
                <h3 className="card-title">Design System &amp; Palette</h3>
                <p className="card-tagline">{cs.design.systemNote}</p>
                <div className="swatch-row">
                  {cs.design.palette.map((sw) => (
                    <button
                      key={sw.hex}
                      type="button"
                      onClick={() => copyHex(sw.hex)}
                      className="swatch-chip"
                      title={`Copy ${sw.hex}`}
                    >
                      <span className="swatch-dot" style={{ backgroundColor: sw.hex }} />
                      <span className="swatch-meta">
                        <strong>{sw.name}</strong>
                        <small>
                          {copiedHex === sw.hex ? (
                            <>
                              <Check size={10} style={{ verticalAlign: -1 }} /> Copied
                            </>
                          ) : (
                            <>
                              {sw.hex} <Copy size={10} style={{ verticalAlign: -1 }} />
                            </>
                          )}
                        </small>
                      </span>
                    </button>
                  ))}
                </div>
              </article>

              <article className="card">
                <h3 className="card-title">Key UX Decisions</h3>
                <ul className="clean-list">
                  {cs.design.uxDecisions.map((d) => (
                    <li key={d.title}>
                      <strong>{d.title}:</strong> {d.detail}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        )}

        {/* === ENGINEERING & BACKEND ARCHITECTURE SECTION === */}
        {showEng && (
          <section className="cs-section">
            <div className="section-head">
              <div>
                <span className="section-kicker">Architecture &amp; Engineering</span>
                <h2 className="section-title">Backend &amp; Tech Stack</h2>
              </div>
              <span className="badge">For Full-Stack &amp; Backend Reviewers</span>
            </div>

            {/* Visual System Architecture Flow */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-top">
                <h3 className="card-title">
                  <Cpu size={18} style={{ verticalAlign: -2, marginRight: 8, color: 'var(--accent)' }} />
                  System Architecture Flow
                </h3>
                <span className="card-year">{cs.team}</span>
              </div>

              <div className="arch-flow">
                {cs.engineering.architectureFlow.map((node, i) => (
                  <div key={node.step} className="arch-node-wrap">
                    <div className="arch-node">
                      <span className="arch-step">0{i + 1} · {node.layer}</span>
                      <strong>{node.step}</strong>
                      <p>{node.detail}</p>
                    </div>
                    {i < cs.engineering.architectureFlow.length - 1 && (
                      <span className="arch-arrow" aria-hidden="true">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Categorized Tech Stack + Engineering Highlights */}
            <div className="grid-2">
              <article className="card">
                <h3 className="card-title">Categorized Tech Stack</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  {cs.engineering.stackGroups.map((grp) => (
                    <div key={grp.label}>
                      <div className="cs-stack-label">{grp.label}</div>
                      <div className="pill-list" style={{ paddingTop: 0 }}>
                        {grp.items.map((item) => (
                          <span key={item} className="tech-pill">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="card">
                <h3 className="card-title">Engineering Highlights</h3>
                <ul className="clean-list">
                  {cs.engineering.highlights.map((h) => (
                    <li key={h.title}>
                      <strong>{h.title}:</strong> {h.detail}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        )}

        {/* === PREV / NEXT FLAGSHIP NAVIGATOR === */}
        <section className="cs-section">
          <div className="cs-pager">
            <button
              type="button"
              onPointerDown={() => playKeyDown('normal')}
              onClick={() => onNavigate(prevProject.id)}
              className="card card-clickable cs-pager-card"
            >
              <span className="cs-pager-dir">
                <ArrowLeft size={14} /> Previous Project
              </span>
              <strong>{prevProject.title}</strong>
              <small>{prevProject.tagline}</small>
            </button>

            <button
              type="button"
              onPointerDown={() => playKeyDown('normal')}
              onClick={() => onNavigate(nextProject.id)}
              className="card card-clickable cs-pager-card cs-pager-right"
            >
              <span className="cs-pager-dir">
                Next Project <ArrowRight size={14} />
              </span>
              <strong>{nextProject.title}</strong>
              <small>{nextProject.tagline}</small>
            </button>
          </div>
        </section>
      </main>

      {/* Lightbox for UI screenshots */}
      {lightboxImg && (
        <div
          className="modal-backdrop"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImg.title}
        >
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
            <h3 className="card-title">{lightboxImg.title}</h3>
            <p className="card-tagline" style={{ marginTop: 4 }}>{lightboxImg.caption}</p>
            <img src={lightboxImg.src} alt={lightboxImg.title} className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
}
