/* Hero acuarela + countdown en vivo hacia el 21/11/2026 14:00 (GT) */

const WEDDING_TARGET = "2026-11-21T20:00:00Z"; /* 2:00 pm Guatemala (UTC-6) */

function useCountdown(targetISO) {
  const [t, setT] = React.useState(() => diff(targetISO));
  React.useEffect(() => {
    const id = setInterval(() => setT(diff(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);
  return t;
}
function diff(targetISO) {
  const ms = Math.max(0, new Date(targetISO).getTime() - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}
const pad = (n) => String(n).padStart(2, "0");

function Countdown() {
  const t = useCountdown(WEDDING_TARGET);
  const { t: tt } = useLang();
  const done = t.days + t.hours + t.mins + t.secs === 0;
  const units = [
    [t.days, tt.hero.dias],
    [pad(t.hours), tt.hero.horas],
    [pad(t.mins), tt.hero.minutos],
    [pad(t.secs), tt.hero.segundos],
  ];
  if (done) {
    return <p className="eb-lead" style={{ marginTop: 8 }}>{tt.hero.hoy}</p>;
  }
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

function Hero({ showCountdown = true }) {
  const { t } = useLang();
  return (
    <header className="hero-wc" id="top">
      <div className="wc-layer"></div>
      <div className="hero-inner-light">
        <span className="hero-eyebrow-dark">{t.hero.bendicion}</span>
        <HeroCarousel count={5} />
        <h1 className="hero-names-dark">
          <span>Ximena</span>
          <span className="amp" style={{ position: "static", textAlign: "center", textDecorationLine: "none", fontStyle: "normal" }}>&amp;</span>
          <span>Diego</span>
        </h1>
        <img className="hero-sprig-dark" src="assets/sprig.svg" alt="" />
        <p className="hero-meta-dark">
          <span style={{ fontSize: "24px" }}>{t.hero.fecha}</span>
          <span style={{ fontSize: "16px" }}><br />{t.hero.lugar}</span>
        </p>
        {showCountdown && <Countdown />}
      </div>
      <div className="scroll-cue-dark"><Icon name="chevron-down" /></div>
    </header>
  );
}

Object.assign(window, { Hero, Countdown, WEDDING_TARGET });
