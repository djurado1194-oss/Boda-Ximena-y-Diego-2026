/* Raíz: scroll-reveal, sección activa, navegación suave y Tweaks */

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

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#74846A", "#4A4F3B"],
  "heroWash": "medio",
  "showCountdown": true,
  "introStyle": "sobre"
}/*EDITMODE-END*/;

const URL_PARAMS = new URLSearchParams(window.location.search);
const FORCED_INTRO = URL_PARAMS.get("intro");          /* "sobre" | "cinema" */
const DEMO_LOOP = URL_PARAMS.get("demo") === "loop";   /* repite la intro */

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [showIntro, setShowIntro] = React.useState(() => {
    if (DEMO_LOOP) return true;
    try { return sessionStorage.getItem(INTRO_KEY) !== "1"; } catch (e) { return true; }
  });
  const introStyle = FORCED_INTRO || t.introStyle;
  useReveal();

  React.useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
  }, [showIntro]);

  const replayIntro = () => {
    try { sessionStorage.removeItem(INTRO_KEY); } catch (e) {}
    window.scrollTo({ top: 0, behavior: "auto" });
    setShowIntro(true);
  };
  const active = useActiveSection(["programa", "lugares", "dress", "regalos", "hoteles", "faq", "rsvp"]);

  React.useEffect(() => {
    const root = document.documentElement;
    const [brand, strong] = t.accent;
    root.style.setProperty("--brand", brand);
    root.style.setProperty("--brand-strong", strong);
  }, [t.accent]);

  React.useEffect(() => {
    const op = { suave: 0.5, medio: 0.8, vivo: 1 }[t.heroWash] || 0.8;
    const layer = document.querySelector(".wc-layer");
    if (layer) layer.style.opacity = op;
  }, [t.heroWash]);

  const onNav = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 10, behavior: "smooth" });
  };

  return (
    <div className="eb-app">
      {showIntro && (introStyle === "cinema"
        ? <CinemaIntro loop={DEMO_LOOP} onDone={() => setShowIntro(false)} />
        : <Intro onDone={() => setShowIntro(false)} />)}
      <Nav active={active} onNav={onNav} />
      <Hero showCountdown={t.showCountdown} />
      <Programa />
      <Lugares />
      <DressCode />
      <Regalos />
      <Hoteles />
      <Faq />
      <Rsvp />
      <Admin />
      <Footer onReplayIntro={replayIntro} />

      <TweaksPanel>
        <TweakSection label="Color de acento" />
        <TweakColor label="Acento" value={t.accent}
          options={[["#74846A", "#4A4F3B"], ["#A08B78", "#74846A"], ["#4A4F3B", "#28281C"]]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSection label="Hero" />
        <TweakRadio label="Acuarela" value={t.heroWash}
          options={["suave", "medio", "vivo"]}
          onChange={(v) => setTweak("heroWash", v)} />
        <TweakToggle label="Mostrar countdown" value={t.showCountdown}
          onChange={(v) => setTweak("showCountdown", v)} />
        <TweakSection label="Apertura" />
        <TweakRadio label="Estilo de intro" value={t.introStyle}
          options={["sobre", "cinema"]}
          onChange={(v) => { setTweak("introStyle", v); replayIntro(); }} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LangProvider><App /></LangProvider>);
