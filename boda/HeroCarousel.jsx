/* Coverflow del Hero: 5 fotos, foto central grande con vecinas asomándose,
   avance automático en bucle. Sin leyendas. */

function HeroCarousel({ count = 5, interval = 3800 }) {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const slides = React.useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);

  const go = (n) => setActive((n + count) % count);
  const next = () => setActive((a) => (a + 1) % count);
  const prev = () => setActive((a) => (a - 1 + count) % count);

  const reduce = typeof window !== "undefined" && window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, reduce, interval, count]);

  /* posición relativa más corta en el anillo (-..0..+) */
  const rel = (i) => {
    let d = i - active;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div
      className="hcar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hcar-stage">
        {slides.map((i) => {
          const d = rel(i);
          const far = Math.abs(d) > 2;
          return (
            <div
              key={i}
              className={"hcar-slide" + (d === 0 ? " is-active" : "")}
              style={{
                transform:
                  `translateX(${d * 38}%) translateZ(${d === 0 ? 0 : -120}px)` +
                  ` rotateY(${d * -22}deg) scale(${d === 0 ? 1 : 0.82})`,
                opacity: far ? 0 : (d === 0 ? 1 : 0.62),
                zIndex: 10 - Math.abs(d),
                pointerEvents: far ? "none" : "auto",
              }}
              onClick={() => (d === 0 ? null : go(i))}
              aria-hidden={d !== 0}
            >
              <image-slot
                id={"hero-foto-" + (i === 0 ? 2 : i === 1 ? 1 : i + 1)}
                class="hcar-img"
                shape="rounded"
                src={"assets/hero-foto-" + (i === 0 ? 2 : i === 1 ? 1 : i + 1) + ".jpg"}
                placeholder={`Foto ${i + 1}`}
              ></image-slot>
            </div>
          );
        })}
      </div>

      <button type="button" className="hcar-nav prev" onClick={prev} aria-label="Foto anterior">
        <Icon name="chevron-left" />
      </button>
      <button type="button" className="hcar-nav next" onClick={next} aria-label="Foto siguiente">
        <Icon name="chevron-right" />
      </button>

      <div className="hcar-dots" role="tablist">
        {slides.map((i) => (
          <button
            key={i}
            type="button"
            className={"hcar-dot" + (i === active ? " on" : "")}
            onClick={() => go(i)}
            aria-label={`Ir a la foto ${i + 1}`}
            aria-selected={i === active}
          ></button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { HeroCarousel });
