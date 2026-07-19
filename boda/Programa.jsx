/* Programa del día (timeline) */

function Programa() {
  const { t } = useLang();
  const icons = ["assets/tl-iglesia.svg", "assets/tl-fotos.svg", "assets/tl-copas.svg", "assets/tl-cena.svg", "assets/tl-pastel.svg", "assets/tl-anillos.svg"];
  const items = t.programa.items.map(([time, title, place], i) => [time, title, place, i === 0, icons[i]]);
  return (
    <section className="section programa" id="programa">
      <div className="wrap">
        <div className="reveal">
          <SectionHead eyebrow={t.programa.eyebrow} title={t.programa.title} />
        </div>
        <div className="tl reveal">
          {items.map(([time, title, place, hl, icon]) => (
            <div key={title} className={"tl-item" + (hl ? " hl" : "")}>
              <div className="tl-time">{time}</div>
              <div className="tl-body">
                <span className="tl-dot"></span>
                <img className="tl-icon" src={icon} alt="" />
                <div className="tl-text">
                  <h3 className="tl-title">{title}</h3>
                  <span className="tl-place"><Icon name="map-pin" />{place}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Lugares con mapas embebidos */

function MapCard({ eyebrow, eyebrowStyle, title, address, lat, lng, slotId }) {
  const { t } = useLang();
  const q = `${lat},${lng}`;
  const embed = `https://maps.google.com/maps?q=${q}&z=16&output=embed`;
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const waze = `https://waze.com/ul?ll=${q}&navigate=yes`;
  const openMap = (url) => (e) => {
    e.preventDefault();
    const w = window.open(url, "_blank", "noopener,noreferrer");
    if (!w) window.location.href = url; /* respaldo si el popup se bloquea */
  };
  return (
    <div className="detail-card">
      <div className="map-wrap">
        <iframe
          className="map-frame"
          style={{ display: "none" }}
          src={embed}
          title={"Mapa de " + title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="detail-body">
        <span className="eyebrow detail-eyebrow" style={eyebrowStyle}>{eyebrow}</span>
        <h3 className="detail-title">{title}</h3>
        <div className="detail-row"><Icon name="map-pin" /><span>{address}</span></div>
        <div className="detail-actions">
          <a className="btn btn-primary" href={gmaps} target="_blank" rel="noopener noreferrer" onClick={openMap(gmaps)}>
            <Icon name="navigation" /> {t.lugares.gmaps}
          </a>
          <a className="btn btn-ghost" href={waze} target="_blank" rel="noopener noreferrer" onClick={openMap(waze)}>
            <Icon name="navigation" /> {t.lugares.waze}
          </a>
        </div>
      </div>
    </div>
  );
}

function Lugares() {
  const { t } = useLang();
  return (
    <section className="section lugares" id="lugares">
      <div className="wrap">
        <div className="reveal">
          <SectionHead eyebrow={t.lugares.eyebrow} title={t.lugares.title} reverse />
        </div>
        <div className="details-grid">
          <div className="reveal" style={{ alignSelf: "flex-start" }}>
            <MapCard
              eyebrow={t.lugares.ceremonia}
              eyebrowStyle={{ fontWeight: 600, fontSize: 12 }}
              title={t.lugares.iglesiaNombre}
              address={t.lugares.iglesiaDir}
              lat="14.5453503" lng="-90.7297489"
            />
          </div>
          <div className="reveal">
            <MapCard
              eyebrow={t.lugares.recepcion}
              eyebrowStyle={{ fontSize: 12, fontWeight: 600 }}
              title={t.lugares.hotelNombre}
              address={t.lugares.hotelDir}
              lat="14.5280492" lng="-90.7581602"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Programa, Lugares, MapCard });
