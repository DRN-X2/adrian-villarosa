import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react';
import { CluckyMascot } from './components/CluckyMascot';
import { ProjectLogoStage } from './components/ProjectLogoStage';
import {
  AWARDS,
  CERTIFICATES,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
  type ProjectCategory,
  type ProjectItem,
} from './data/portfolioData';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const CATEGORIES: ProjectCategory[] = ['All', 'Full-Stack', 'AI / Hackathon', 'Mobile', 'IoT'];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [category, setCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [lightbox, setLightbox] = useState<{ title: string; subtitle: string; image: string; link?: string } | null>(
    null
  );
  const [copied, setCopied] = useState(false);

  const visibleProjects =
    category === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === category);

  // Lightweight IntersectionObserver for active pill highlight (0 scroll-listener lag)
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close modal/lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setLightbox(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <div className="page-shell">
      {/* === FLOATING STICKY PILL NAV === */}
      <header className="nav-wrap">
        <nav className="pill-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'is-active' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a href={PROFILE.resumePdf} download className="nav-link nav-resume">
            Resume
          </a>
        </nav>
      </header>

      <main>
        {/* === HERO === */}
        <section id="home" className="hero">
          <div className="hero-ghosts" aria-hidden="true">
            <span className="ghost-token ghost-1">01</span>
            <span className="ghost-token ghost-2">&lt;/&gt;</span>
            <span className="ghost-token ghost-3">DEV</span>
          </div>

          <div className="hero-content">
            <div className="hero-identity">
              <button
                type="button"
                className="hero-avatar-btn"
                onClick={() =>
                  setLightbox({
                    title: PROFILE.name,
                    subtitle: `${PROFILE.role} · ${PROFILE.location}`,
                    image: PROFILE.photo,
                  })
                }
                aria-label="View Adrian Villarosa portrait"
              >
                <img src={PROFILE.photo} alt={PROFILE.name} className="hero-avatar" />
              </button>

              <div className="hero-identity-text">
                <div className="hero-fullname">{PROFILE.name}</div>
                <div className="status-pill">
                  <span className="status-dot" />
                  <span>Open to Work · {PROFILE.location}</span>
                </div>
              </div>
            </div>

            <h1 className="hero-title">
              Turning ideas into{' '}
              <span className="accent">viable apps.</span>
            </h1>

            <p className="hero-sub">
              4th-year BSIT student &amp; Software Engineer crafting fast full-stack web apps,
              cross-platform mobile experiences, and AI-powered tools with React, TypeScript,
              Supabase, and Python.
            </p>

            <div className="cta-row">
              <a href={PROFILE.resumePdf} download className="btn btn-primary">
                <Download size={17} /> Download Resume
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-dark">
                <Github size={17} /> GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="btn btn-soft">
                <Linkedin size={17} /> LinkedIn
              </a>
              <a href="#contact" className="btn btn-soft">
                <Mail size={17} /> Contact
              </a>
            </div>
          </div>

          <div className="hero-toy">
            <CluckyMascot />
          </div>
        </section>

        {/* === PROJECTS === */}
        <section id="projects" className="section">
          <div className="section-head">
            <div>
              <span className="section-kicker">Selected Builds</span>
              <h2 className="section-title">Projects</h2>
            </div>

            <div className="filter-row" role="tablist" aria-label="Filter projects by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  onClick={() => setCategory(cat)}
                  className={`filter-pill ${category === cat ? 'is-active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {visibleProjects.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                className="card card-clickable"
              >
                {project.logoVariants && (
                  <ProjectLogoStage
                    title={project.title}
                    variants={project.logoVariants}
                    compact
                  />
                )}

                <div className="card-top">
                  <span className="badge badge-accent">{project.badge ?? project.category}</span>
                  <span className="card-year">{project.year}</span>
                </div>

                <h3 className="card-title">{project.title}</h3>
                <p className="card-tagline">{project.tagline}</p>

                <div className="pill-list">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="tech-pill">+{project.stack.length - 4}</span>
                  )}
                </div>

                <div className="card-actions">
                  <span className="card-footer-hint" style={{ marginTop: 0 }}>
                    Inspect build <ArrowUpRight size={15} />
                  </span>

                  <div className="card-action-links">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mini-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={12} /> Repo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === EXPERIENCE === */}
        <section id="experience" className="section">
          <div className="section-head">
            <div>
              <span className="section-kicker">Applied Engineering</span>
              <h2 className="section-title">Experience</h2>
            </div>
          </div>

          <article className="exp-card">
            <div className="card-top">
              <span className="badge badge-accent">Lead Software Developer (Capstone)</span>
              <span className="card-year">2026 · Manolo Fortich, Bukidnon</span>
            </div>

            <h3 className="card-title" style={{ marginTop: 10 }}>
              Municipal Nutrition Action Office (MNAO) — LGU Manolo Fortich
            </h3>
            <p className="card-tagline" style={{ marginTop: 6 }}>
              Engineered <strong>NutriVision</strong>, a full-stack Nutrition Commodity Inventory
              &amp; Decision Support System replacing manual paper workflows for local government
              nutrition operations.
            </p>

            <div className="metric-strip">
              <div className="metric-box">
                <div className="metric-num">14</div>
                <div className="metric-label">PostgreSQL Tables</div>
              </div>
              <div className="metric-box">
                <div className="metric-num">75.50</div>
                <div className="metric-label">Overall SUS (Good)</div>
              </div>
              <div className="metric-box">
                <div className="metric-num">77.86</div>
                <div className="metric-label">MNAO Client SUS</div>
              </div>
              <div className="metric-box">
                <div className="metric-num">4.40/5</div>
                <div className="metric-label">Utility Rating</div>
              </div>
            </div>

            <ul className="clean-list">
              <li>
                <strong>Database &amp; Governance:</strong> Modeled Inventory &amp; Stock
                Disposition, Human Milk Bank, Barangay Distribution logging, Defect/Quarantine, and
                role-based access on Supabase PostgreSQL.
              </li>
              <li>
                <strong>Automation:</strong> Built OCR label scanning for batch numbers and
                expiration dates, automated FEFO expiry alerts, and one-click PDF/Excel/CSV report
                exports.
              </li>
              <li>
                <strong>Stakeholder Validation:</strong> Evaluated live with 10 LGU respondents (7
                MNAO staff + 3 MISO IT experts).
              </li>
            </ul>
          </article>
        </section>

        {/* === AWARDS & COMPETITIONS === */}
        <section id="awards" className="section">
          <div className="section-head">
            <div>
              <span className="section-kicker">Hackathons &amp; Recognition</span>
              <h2 className="section-title">Awards &amp; Competitions</h2>
            </div>
          </div>

          <div className="grid-3">
            {AWARDS.map((award) => (
              <button
                key={award.id}
                type="button"
                onClick={() =>
                  award.image &&
                  setLightbox({
                    title: award.title,
                    subtitle: `${award.issuer} · ${award.date}`,
                    image: award.image,
                  })
                }
                className="card card-clickable"
              >
                {award.image && (
                  <img
                    src={award.image}
                    alt={award.title}
                    loading="lazy"
                    className="media-thumb"
                  />
                )}
                <div className="card-top">
                  <span className="badge badge-accent">
                    <Award size={13} /> {award.rank}
                  </span>
                  <span className="card-year">{award.date}</span>
                </div>
                <h3 className="card-title" style={{ fontSize: '1.2rem' }}>
                  {award.title}
                </h3>
                <p className="card-tagline">{award.summary}</p>
                <span className="card-footer-hint">
                  View proof <ArrowUpRight size={15} />
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* === CERTIFICATES === */}
        <section id="certificates" className="section">
          <div className="section-head">
            <div>
              <span className="section-kicker">Verified Learning</span>
              <h2 className="section-title">Certificates</h2>
            </div>
          </div>

          <div className="grid-2">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className="card">
                {cert.image && (
                  <button
                    type="button"
                    onClick={() =>
                      setLightbox({
                        title: cert.title,
                        subtitle: `${cert.issuer} · ${cert.date}`,
                        image: cert.image!,
                        link: cert.verifyUrl,
                      })
                    }
                    style={{ border: 'none', padding: 0, background: 'transparent' }}
                    aria-label={`Preview ${cert.title} certificate`}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="media-thumb"
                    />
                  </button>
                )}

                <div className="card-top">
                  <span className="badge">{cert.issuer}</span>
                  <span className="card-year">{cert.date}</span>
                </div>

                <h3 className="card-title" style={{ fontSize: '1.2rem' }}>
                  {cert.title}
                </h3>

                <div className="pill-list">
                  {cert.skills.map((s) => (
                    <span key={s} className="tech-pill">
                      {s}
                    </span>
                  ))}
                </div>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="card-footer-hint"
                  >
                    Verify credential <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* === EDUCATION & SKILLS === */}
        <section id="education" className="section">
          <div className="section-head">
            <div>
              <span className="section-kicker">Foundation &amp; Stack</span>
              <h2 className="section-title">Education &amp; Skills</h2>
            </div>
          </div>

          <div className="grid-2">
            <article className="card">
              <div className="card-top">
                <span className="badge badge-accent">
                  <GraduationCap size={14} /> 4th Year · Expected 2027
                </span>
              </div>
              <h3 className="card-title">Bachelor of Science in Information Technology</h3>
              <p className="card-tagline">
                Northern Bukidnon State College · Manolo Fortich, Bukidnon, Philippines
              </p>
              <p className="card-tagline">
                Focused on full-stack software engineering, relational database design, data
                analytics, project management, and IoT systems.
              </p>
              <div className="pill-list">
                <span className="tech-pill">
                  <MapPin size={12} style={{ verticalAlign: -1, marginRight: 4 }} />
                  Bukidnon, PH
                </span>
                <span className="tech-pill">
                  <Sparkles size={12} style={{ verticalAlign: -1, marginRight: 4 }} />
                  Team Token Maxxers
                </span>
              </div>
            </article>

            <div className="card">
              <h3 className="card-title">Technical Toolkit</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                {SKILL_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--muted)',
                        marginBottom: 6,
                      }}
                    >
                      {group.label}
                    </div>
                    <div className="pill-list" style={{ paddingTop: 0 }}>
                      {group.items.map((item) => (
                        <span key={item} className="tech-pill">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === CONTACT === */}
        <section id="contact" className="section">
          <div className="contact-card">
            <span className="badge" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
              Let&apos;s Work Together
            </span>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              Let&apos;s build something great together.
            </h2>
            <p>
              Open for Software Engineer, Full-Stack Developer, and Mobile Developer opportunities
              (remote, hybrid, or on-site). Reach out anytime.
            </p>

            <div className="cta-row">
              <button type="button" onClick={copyEmail} className="btn btn-primary">
                {copied ? <Check size={17} /> : <Copy size={17} />}
                {copied ? 'Email Copied!' : PROFILE.email}
              </button>
              <a href={PROFILE.resumePdf} download className="btn btn-white">
                <Download size={17} /> Resume PDF
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light"
              >
                <Linkedin size={17} /> LinkedIn
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light"
              >
                <Github size={17} /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-foot">
        © {new Date().getFullYear()} {PROFILE.name} · Built with React, TypeScript &amp; Vite
      </footer>

      {/* === PROJECT DETAIL MODAL === */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              <X size={20} />
            </button>

            {selectedProject.logoVariants && (
              <div style={{ marginBottom: 16, clear: 'both', paddingTop: 6 }}>
                <ProjectLogoStage
                  title={selectedProject.title}
                  variants={selectedProject.logoVariants}
                />
              </div>
            )}

            <span className="badge badge-accent">
              {selectedProject.badge ?? selectedProject.category} · {selectedProject.year}
            </span>
            <h2 id="modal-project-title" className="section-title" style={{ marginTop: 10 }}>
              {selectedProject.title}
            </h2>
            <p className="card-tagline" style={{ marginTop: 8, fontSize: '1rem' }}>
              {selectedProject.description}
            </p>

            {selectedProject.metrics && (
              <div className="pill-list" style={{ margin: '14px 0' }}>
                {selectedProject.metrics.map((m) => (
                  <span key={m} className="badge badge-accent">
                    {m}
                  </span>
                ))}
              </div>
            )}

            <ul className="clean-list" style={{ margin: '14px 0 18px' }}>
              {selectedProject.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="pill-list" style={{ marginBottom: 20 }}>
              {selectedProject.stack.map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className="cta-row">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-dark"
                >
                  <Github size={16} /> View Repo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* === IMAGE LIGHTBOX (Awards & Certificates) === */}
      {lightbox && (
        <div
          className="modal-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
        >
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
            >
              <X size={20} />
            </button>
            <h3 className="card-title">{lightbox.title}</h3>
            <p className="card-tagline" style={{ marginTop: 4 }}>
              {lightbox.subtitle}
            </p>
            <img src={lightbox.image} alt={lightbox.title} className="lightbox-img" />
            {lightbox.link && (
              <div className="cta-row" style={{ marginTop: 16 }}>
                <a
                  href={lightbox.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <ExternalLink size={16} /> Open Verification Link
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
