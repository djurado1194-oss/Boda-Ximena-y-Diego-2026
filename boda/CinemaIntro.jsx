/* Intro cinemática estilo "caja envuelta botánica":
   fondo a pantalla completa (foto/ilustración del usuario) + velo verde,
   botón "Abrir invitación" → los nombres aparecen solos, lento y elegante. */

function CinemaIntro({ onDone, loop = false }) {
  /* fases: ready (fondo + botón) → opening (sello/hojas ceden) → names (revelado) → gone */
  const [phase, setPhase] = React.useState("ready");
  const timers = React.useRef([]);
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  React.useEffect(() => () => clearAll(), []);

  const reduce = typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = React.useCallback(() => {
    clearAll();
    try { if (!loop) sessionStorage.setItem(INTRO_KEY, "1"); } catch (e) {}
    const T = (fn, ms) => timers.current.push(setTimeout(fn, reduce ? Math.min(ms, 240) : ms));
    setPhase("opening");                 /* sello y hojas se retiran */
    T(() => setPhase("names"), 760);     /* los nombres empiezan a aparecer */
    if (loop) {
      /* modo demo: mantener y reiniciar */
      T(() => setPhase("ready"), reduce ? 1600 : 8200);
      T(() => run(), reduce ? 2100 : 8800);
    } else {
      T(() => setPhase("gone"), reduce ? 1400 : 6200);
      T(() => { onDone && onDone(); }, reduce ? 1900 : 7000);
    }
  }, [loop, reduce, onDone]);

  React.useEffect(() => {
    if (loop) { const id = setTimeout(run, 900); return () => clearTimeout(id); }
  }, [loop, run]);

  const open = () => { if (phase === "ready") run(); };

  const cls = "cintro phase-" + phase + (phase === "gone" ? " is-gone" : "");

  return (
    <div className={cls} role="button" aria-label="Abrir la invitación" onClick={open}>
      {/* Fondo: foto/ilustración del usuario */}
      <image-slot
        id="intro-fondo"
        class="ci-photo"
        shape="rect"
        placeholder="Ilustración / foto botánica de fondo"
      ></image-slot>

      {/* Velo verde para legibilidad y atmósfera */}
      <div className="ci-veil" aria-hidden="true"></div>

      {/* Marco botánico + cordón + sello (encuadre estilo referencia) */}
      <div className="ci-decor" aria-hidden="true">
        <img className="ci-leaf lf-tr" src="assets/sprig.svg" alt="" />
        <img className="ci-leaf lf-bl" src="assets/sprig.svg" alt="" />
        <span className="ci-cord cord-v"></span>
        <span className="ci-cord cord-h"></span>
        <span className="ci-seal">X<span className="amp">&amp;</span>D</span>
      </div>

      {/* Estado inicial: invitación a abrir */}
      <div className="ci-start">
        <span className="ci-kicker">Nuestra boda</span>
        <button type="button" className="ci-open-btn" onClick={(e) => { e.stopPropagation(); open(); }}>
          Abrir invitación
        </button>
      </div>

      {/* Revelado cinemático de los nombres */}
      <div className="ci-reveal" aria-hidden={phase === "ready"}>
        <span className="ci-eyebrow">Con la bendición de Dios y nuestras familias</span>
        <h1 className="ci-names">
          <span className="word w1">Ximena</span>
          <span className="amp">&amp;</span>
          <span className="word w2">Diego</span>
        </h1>
        <img className="ci-sprig" src="assets/sprig.svg" alt="" />
        <span className="ci-date">Sábado · 21 de noviembre · 2026</span>
      </div>
    </div>
  );
}

Object.assign(window, { CinemaIntro });
