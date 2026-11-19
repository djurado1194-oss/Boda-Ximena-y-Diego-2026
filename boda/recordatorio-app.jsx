/* Recordatorio para invitados: versión corta de la invitación.
   Orden: portada corta (cuenta regresiva + calendario) → programa → ubicaciones →
   vestimenta corta → regalos → preguntas de logística → cierre.
   Sin intro del sobre, sin carrusel, sin hospedaje, sin confirmación ni panel admin. */

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach(el => el.classList.add("prehide"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.remove("prehide"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

const SECTIONS = ["programa", "lugares", "dress", "regalos", "faq"];

/* Textos propios del recordatorio (el resto sale del diccionario de la invitación) */
const REC = {
  es: {
    eyebrow: "Recordatorio",
    agregar: "Guárdalo en tu calendario",
    dressTitle: "Etiqueta formal",
    faqLlegada: ["¿Con cuánta anticipación debemos llegar a la ceremonia?", "La ceremonia empieza a las **3:00 pm**. Te sugerimos llegar entre las **2:30 y 2:40 pm** para encontrar estacionamiento con calma."],
    faqContacto: ["¿Cómo podemos contactarlos si tenemos dudas?", "Escríbenos directamente por WhatsApp y te responderemos con gusto."],
  },
  en: {
    eyebrow: "Reminder",
    agregar: "Save it to your calendar",
    dressTitle: "Formal attire",
    faqLlegada: ["How early should we arrive?", "The ceremony starts at **3:00 pm**. We suggest arriving between **2:30 and 2:40 pm** so you have time to find parking."],
    faqContacto: ["How can we reach you with questions?", "Message us directly on WhatsApp and we'll gladly get back to you."],
  },
};

/* Cuenta regresiva hacia la ceremonia: 3:00 pm Guatemala (UTC-6) = 21:00 UTC */
const REC_TARGET = "2026-11-21T21:00:00Z";

function RecCountdown() {
  const c = useCountdown(REC_TARGET);
  const { t } = useLang();
  if (c.days + c.hours + c.mins + c.secs === 0) {
    return <p className="eb-lead" style={{ marginTop: 8 }}>{t.hero.hoy}</p>;
  }
  const units = [
    [c.days, t.hero.dias], [pad(c.hours), t.hero.horas],
    [pad(c.mins), t.hero.minutos], [pad(c.secs), t.hero.segundos],
  ];
  return (
    <div className="countdown countdown-light">
      {units.map(([n, u]) => (
        <div key={u} className="cd-unit">
          <div className="cd-n">{n}</div>
          <div className="cd-u">{u}</div>
        </div>
      ))}
    </div>
  );
}

function NavRecordatorio({ active, onNav }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoOk, setLogoOk] = React.useState(true);
  const { t } = useLang();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = SECTIONS.map(id => [id, t.nav[id]]);
  const go = (id) => { setOpen(false); onNav(id); };

  return (
    <React.Fragment>
      <nav className="nav glass" style={scrolled ? { boxShadow: "var(--shadow-md)" } : {}}>
        <span className="nav-mark">
          {logoOk
            ? <img className="nav-logo" src="assets/logo.svg" alt="Ximena & Diego"
                onError={() => setLogoOk(false)} />
            : <span>X &amp; D</span>}
        </span>
        <div className="nav-links desktop">
          {links.map(([id, label]) => (
            <a key={id} href={"#" + id} className={active === id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
          ))}
        </div>
        <span className="rec-nav-right">
          <LangSwitch className="rec-lang" />
          <button className="nav-burger" aria-label="Menú" onClick={() => setOpen(o => !o)}>
            <Icon name={open ? "x" : "menu"} />
          </button>
        </span>
      </nav>
      <div className={"nav-sheet glass" + (open ? " open" : "")}>
        {links.map(([id, label]) => (
          <a key={id} href={"#" + id} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
        ))}
      </div>
    </React.Fragment>
  );
}

/* Portada corta: una foto, nombres, fecha, cuenta regresiva y calendario */
function RecHero() {
  const { t, lang } = useLang();
  const r = REC[lang] || REC.es;
  return (
    <header className="hero-wc rec-hero" id="top">
      <div className="wc-layer" style={{ opacity: 0.8 }}></div>
      <div className="hero-inner-light">
        <span className="rec-badge">{r.eyebrow}</span>
        <div className="rec-cover">
          <img className="rec-cover-photo" src="assets/hero-foto-1.jpg" alt="" />
          <h1 className="hero-names-dark rec-cover-names">
            <span>Ximena</span>
            <span className="amp">&amp;</span>
            <span>Diego</span>
          </h1>
        </div>
        <p className="hero-meta-dark rec-meta">
          <span style={{ fontSize: "22px" }}>{t.hero.fecha}</span>
          <span style={{ fontSize: "16px" }}><br />{t.hero.lugar}</span>
        </p>
        <RecCountdown />
        <div className="rec-cal">
          <span className="rec-cal-label"><Icon name="calendar-heart" /> {r.agregar}</span>
          <div className="rec-cal-actions">
            <a className="btn btn-primary" href={googleCalUrl()} target="_blank" rel="noopener noreferrer">
              <Icon name="calendar-plus" /> {t.rsvp.gcal}
            </a>
            <button type="button" className="btn btn-soft" onClick={downloadICS}>
              <Icon name="download" /> {t.rsvp.ics}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

/* Vestimenta en versión corta */
function RecDress() {
  const { t, lang } = useLang();
  const r = REC[lang] || REC.es;
  return (
    <section className="section dress rec-dress" id="dress">
      <div className="wrap-narrow">
        <div className="reveal">
          <SectionHead eyebrow={t.dress.eyebrow} title={r.dressTitle} />
        </div>
        <div className="rec-dress-card reveal">
          <div className="rec-dress-row">
            <div>
              <h3 className="rec-dress-k">{t.dress.hombresTitle}</h3>
              <p className="rec-dress-v">{t.dress.hombresSub}</p>
            </div>
            <div>
              <h3 className="rec-dress-k">{t.dress.mujeresTitle}</h3>
              <p className="rec-dress-v">{t.dress.mujeresSub}</p>
            </div>
          </div>
          <ul className="rec-dress-notes">
            <li><Icon name="palette" /><span><strong>{t.dress.notaMujeresLabel}</strong> {t.dress.notaMujeres}</span></li>
            <li><Icon name="sun" /><span>{t.dress.notaAireLibre} <strong>{t.dress.notaAireLibreBold}</strong></span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Preguntas de logística del día (sin mascotas; contacto sin mencionar el formulario) */
function RecFaq() {
  const [openIdx, setOpenIdx] = React.useState(0);
  const { t, lang } = useLang();
  const r = REC[lang] || REC.es;
  const src = t.faq.items;
  const picked = [r.faqLlegada, src[3], src[0], src[1], r.faqContacto];
  const items = picked.map(([q, a]) => ({ q, a }));
  return (
    <section className="section faq" id="faq">
      <div className="wrap-narrow">
        <div className="reveal">
          <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </div>
        <div className="faq-list reveal">
          {items.map((item, i) => (
            <FaqItem key={i} item={item} open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  useReveal();
  const active = useActiveSection(SECTIONS);

  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 10, behavior: "smooth" });
  };

  return (
    <div className="eb-app rec-page">
      <NavRecordatorio active={active} onNav={onNav} />
      <RecHero />
      <Programa />
      <Lugares />
      <RecDress />
      <div className="rec-regalos"><Regalos /></div>
      <RecFaq />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LangProvider><App /></LangProvider>);
