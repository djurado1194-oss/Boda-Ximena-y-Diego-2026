/* Introducción cinemática nativa: sobre sage con monograma dorado →
   toca para abrir → la solapa se despliega → nombres revelados sobre la foto */

const INTRO_KEY = "boda_xd_intro_seen";

function Intro({ onDone }) {
  /* fases: sealed (sobre cerrado) → opening (la solapa se abre) → names (revelado) → cierre */
  const [phase, setPhase] = React.useState("sealed");
  const [drag, setDrag] = React.useState(0);       /* 0..1 progreso mientras arrastras la solapa */
  const [dragging, setDragging] = React.useState(false);
  const timers = React.useRef([]);
  const dragState = React.useRef({ startY: 0, active: false });
  const { t } = useLang();

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const reduce = () => typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const open = () => {
    if (phase !== "sealed") return;
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch (e) {}
    const r = reduce();
    const T = (fn, ms) => timers.current.push(setTimeout(fn, r ? Math.min(ms, 300) : ms));

    setDragging(false);
    setPhase("opening");                    /* la solapa se despliega */
    T(() => setPhase("names"), r ? 300 : 1150);   /* los nombres aparecen sobre la foto */
    T(() => setPhase("gone"), r ? 1500 : 6300);
    T(() => { onDone && onDone(); }, r ? 2000 : 7300);
  };

  /* Arrastra la solapa hacia arriba para despegarla, como al abrir un sobre real */
  const onFlapDown = (e) => {
    if (phase !== "sealed") return;
    dragState.current = { startY: (e.touches ? e.touches[0].clientY : e.clientY), active: true };
    setDragging(true);
  };
  const onFlapMove = (e) => {
    if (!dragState.current.active) return;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    const dist = dragState.current.startY - y;             /* arrastrar hacia arriba = progreso positivo */
    setDrag(Math.max(0, Math.min(1, dist / 130)));
  };
  const onFlapUp = () => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    if (drag > 0.4) { open(); }
    else { setDragging(false); setDrag(0); }
  };

  const cls = "intro phase-" + phase + (phase === "gone" ? " is-gone" : "") + (dragging ? " is-dragging" : "");
  const flapStyle = dragging && phase === "sealed"
    ? { transform: `rotateX(${-178 * drag}deg)`, transition: "none" }
    : undefined;
  const sealStyle = dragging && phase === "sealed"
    ? { opacity: 1 - drag * 1.4, transform: `translate(-50%, -50%) scale(${1 - drag * 0.7})`, transition: "none" }
    : undefined;

  return (
    <div className={cls} onClick={open} role="button" aria-label={t.intro.abrir}>
      <img className="intro-bg" src="assets/intro-bg.png" alt="" />
      <div className="intro-scrim" aria-hidden="true"></div>

      <img className="intro-orn o1" src="assets/sprig.svg" alt="" />
      <img className="intro-orn o2" src="assets/sprig.svg" alt="" />
      <img className="intro-orn o3" src="assets/sprig.svg" alt="" />
      <img className="intro-orn o4" src="assets/sprig.svg" alt="" />

      <div className="env-stage" aria-hidden={phase !== "sealed"}>
        <div className="envelope">
          <div className="env-back"></div>
          <div className="env-front"></div>
          <div
            className="env-flap"
            style={flapStyle}
            onPointerDown={onFlapDown}
            onPointerMove={onFlapMove}
            onPointerUp={onFlapUp}
            onPointerLeave={onFlapUp}
            onTouchStart={onFlapDown}
            onTouchMove={onFlapMove}
            onTouchEnd={onFlapUp}
          ></div>
          <img className="env-seal" style={sealStyle} src="assets/monogram.svg" alt="X &amp; D" />
        </div>
      </div>

      <p className="intro-hint"><Icon name="hand" /> {dragging ? t.intro.deslizando : t.intro.toca}</p>

      {/* Panel cinemático con los nombres, sobre la foto */}
      <div className="cinema" aria-hidden={phase !== "names" && phase !== "gone"}>
        <div className="cinema-inner">
          <span className="cinema-eyebrow">{t.intro.bendicion}</span>
          <h1 className="cinema-names">
            <span className="word w1">Ximena</span>
            <span className="amp">&amp;</span>
            <span className="word w2">Diego</span>
          </h1>
          <img className="cinema-sprig" src="assets/sprig.svg" alt="" />
          <span className="cinema-date">{t.intro.fecha}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Intro, INTRO_KEY });
