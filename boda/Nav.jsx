/* Navegación fija de vidrio esmerilado */

function Nav({ active, onNav }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoOk, setLogoOk] = React.useState(true);
  const { t } = useLang();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["programa", t.nav.programa],
    ["lugares", t.nav.lugares],
    ["dress", t.nav.dress],
    ["regalos", t.nav.regalos],
    ["hoteles", t.nav.hoteles],
    ["faq", t.nav.faq],
  ];

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
            <a key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</a>
          ))}
        </div>
        <LangSwitch className="desktop" />
        <a className="btn btn-primary nav-cta desktop" style={{ padding: "10px 22px", fontSize: 14 }} onClick={() => go("rsvp")}>{t.nav.confirmar}</a>
        <button className="nav-burger" aria-label="Menú" onClick={() => setOpen(o => !o)}>
          <Icon name={open ? "x" : "menu"} />
        </button>
      </nav>
      <div className={"nav-sheet glass" + (open ? " open" : "")}>
        {links.map(([id, label]) => (
          <a key={id} onClick={() => go(id)}>{label}</a>
        ))}
        <a onClick={() => go("rsvp")} style={{ color: "var(--brand-strong)", fontWeight: 600 }}>{t.nav.confirmarAsistencia}</a>
        <LangSwitch className="sheet" />
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { Nav });
