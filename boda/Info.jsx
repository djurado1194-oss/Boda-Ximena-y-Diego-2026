/* Dress code + paleta, Hoteles, Regalos */

function DressCode() {
  const { t } = useLang();
  return (
    <section className="section dress" id="dress">
      <div className="wrap">
        <div className="reveal">
          <SectionHead eyebrow={t.dress.eyebrow} title={t.dress.title} />
        </div>
        <div className="dress-card reveal">
          <div className="dress-illustration" aria-hidden="true"></div>
          <div className="dress-columns">
            <div className="dress-col">
              <h3 className="dress-col-title">{t.dress.hombresTitle}</h3>
              <p className="dress-col-sub">{t.dress.hombresSub}<br /></p>
            </div>
            <div className="dress-col-divider" aria-hidden="true"></div>
            <div className="dress-col">
              <h3 className="dress-col-title">{t.dress.mujeresTitle}</h3>
              <p className="dress-col-sub">{t.dress.mujeresSub}<br /></p>
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <span className="dress-note" style={{ width: "100%" }}>
              <Icon name="info" />
              <span><strong>{t.dress.notaMujeresLabel}</strong> {t.dress.notaMujeres}</span>
            </span>
          </div>
          <div className="palette-caption"></div>
          <strong style={{ fontSize: "13.5px" }}>{t.dress.notaTitulo}</strong>
          <span style={{ fontSize: "13.5px" }}>
            <br />
            {t.dress.notaAireLibre} <b><u>{t.dress.notaAireLibreBold}</u></b>
          </span>
        </div>
      </div>
    </section>
  );
}

const WISHLIST_URL = "https://www.airbnb.com/l/t415ZJdW";

function Hoteles() {
  const [tab, setTab] = React.useState("hoteles");
  const { t } = useLang();
  /* Datos provisionales — se llenan después */
  const hotels = [
    {
      id: "hotel-1",
      name: t.hoteles.hotels[0][0],
      zone: t.hoteles.cerca,
      note: t.hoteles.hotels[0][1],
      href: "https://soleilantigua.com/",
      photo: "assets/hotel-soleil-antigua.jpg",
    },
    {
      id: "hotel-2",
      name: t.hoteles.hotels[1][0],
      zone: t.hoteles.cerca,
      note: t.hoteles.hotels[1][1],
      href: "https://www.mestizoantigua.com/habitacionesmestizoantigua",
      metaStyle: { flexDirection: "row" },
      photo: "assets/hotel-mestizo-centro.jpg",
    },
    {
      id: "hotel-3",
      name: t.hoteles.hotels[2][0],
      zone: t.hoteles.cerca,
      note: t.hoteles.hotels[2][1],
      href: "https://www.caminorealantigua.com.gt/en/?sjrncid=GA_23528198795&sjrnaid=GA_795815786086&gad_source=1&gad_campaignid=23528198795&gbraid=0AAAABCH4zquaDOBq3kQU1GWI_UOsWMCcm&gclid=Cj0KCQjw6_HSBhCpARIsANvVltYF05gG7JgnjM_nf5GrBkRevcAYe7QY0SHSumgmTz5gJVrIGsxd2C8aAi9DEALw_wcB",
      photo: "assets/hotel-camino-real.jpg",
    },
  ];
  const airbnbs = [
    { id: "airbnb-1", photo: "assets/airbnb-1.avif", name: t.hoteles.airbnbs[0], href: "https://www.airbnb.com.gt/rooms/1468315219034155741?adults=1&check_in=2026-11-20&check_out=2026-11-22&children=0&infants=0&pets=0&wishlist_item_id=11005650352665&source_impression_id=p3_1783578363_P3vrar5HLQrxDE1S&previous_page_section_name=1000" },
    { id: "airbnb-2", photo: "assets/airbnb-2.avif", name: t.hoteles.airbnbs[1], href: "https://www.airbnb.com.gt/rooms/931967771813363891?adults=1&check_in=2026-11-20&check_out=2026-11-22&children=0&infants=0&pets=0&wishlist_item_id=11005069073456&source_impression_id=p3_1783578486_P3_X_TeXqMDymNlx&previous_page_section_name=1000" },
    { id: "airbnb-3", photo: "assets/airbnb-3.avif", name: t.hoteles.airbnbs[2], href: "https://www.airbnb.com.gt/rooms/52920542?adults=1&check_in=2026-11-20&check_out=2026-11-22&children=0&infants=0&pets=0&wishlist_item_id=11005069080630&source_impression_id=p3_1783578535_P3UTMq28pbM1oRGz&previous_page_section_name=1000" },
  ].map((a) => ({
    ...a,
    zone: t.hoteles.cerca,
    note: t.hoteles.seleccionada,
  }));
  return (
    <section className="section hoteles" id="hoteles">
      <div className="wrap">
        <div className="reveal">
          <SectionHead eyebrow={t.hoteles.eyebrow} title={t.hoteles.title} />
        </div>

        <div className="lodging-toggle reveal" role="tablist">
          <button
            className={"lodging-pill" + (tab === "hoteles" ? " is-active" : "")}
            role="tab" aria-selected={tab === "hoteles"}
            onClick={() => setTab("hoteles")}>
            <Icon name="building-2" /> {t.hoteles.hotelesTab}
          </button>
          <button
            className={"lodging-pill" + (tab === "airbnb" ? " is-active" : "")}
            role="tab" aria-selected={tab === "airbnb"}
            onClick={() => setTab("airbnb")}>
            <Icon name="home" /> {t.hoteles.airbnbTab}
          </button>
        </div>

        {tab === "hoteles" && (
          <React.Fragment>
            <p className="lodging-intro reveal" style={{ marginTop: "var(--space-6)" }}>
              {t.hoteles.introHoteles}
            </p>
          <div className="hotel-grid">
            {hotels.map((h) => (
              <div key={h.id} className="hotel-card reveal">
                <image-slot id={h.id} class="hotel-photo" shape="rect" src={h.photo} placeholder="Foto del hotel"></image-slot>
                <div className="hotel-body">
                  <h3 className="hotel-name">{h.name}</h3>
                  <span className="hotel-meta" style={h.metaStyle}><Icon name="map-pin" />{h.zone}</span>
                  <span className="hotel-pending">{h.note}</span>
                  <a className="btn btn-soft" href={h.href} target="_blank" rel="noopener noreferrer">
                    <Icon name="phone" /> {t.hoteles.reservar}
                  </a>
                </div>
              </div>
            ))}
          </div>
          </React.Fragment>
        )}

        {tab === "airbnb" && (
          <React.Fragment>
            <p className="lodging-intro reveal" style={{ marginTop: "var(--space-6)" }}>
              {t.hoteles.introAirbnb}
            </p>
            <div className="hotel-grid">
              {airbnbs.map((a) => (
                <a key={a.id} className="hotel-card reveal" href={a.href} target="_blank" rel="noopener noreferrer">
                  <image-slot id={a.id} class="hotel-photo" shape="rect" src={a.photo} placeholder="Foto del Airbnb"></image-slot>
                  <div className="hotel-body">
                    <h3 className="hotel-name">{a.name}</h3>
                    <span className="hotel-meta"><Icon name="map-pin" />{a.zone}</span>
                    <span className="hotel-pending">{a.note}</span>
                    <span className="btn btn-soft" style={{ marginTop: "auto", justifyContent: "center" }}>
                      <Icon name="external-link" /> {t.hoteles.verAirbnb}
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="reveal" style={{ textAlign: "center", marginTop: "var(--space-7)" }}>
              <a className="btn btn-primary" href={WISHLIST_URL} target="_blank" rel="noopener noreferrer">
                <Icon name="external-link" /> {t.hoteles.verLista}
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    </section>
  );
}

function Regalos() {
  const [copied, setCopied] = React.useState("");
  const { t } = useLang();
  const accounts = t.regalos.cuentas;
  const copy = (id, v) => {
    try {
      navigator.clipboard.writeText(v);
      setCopied(id);
      setTimeout(() => setCopied(""), 1600);
    } catch (e) {}
  };
  return (
    <section className="section regalos" id="regalos">
      <div className="wrap">
        <div className="reveal">
          <SectionHead title={t.regalos.title} />
        </div>
        <p className="eb-lead reveal" style={{ textAlign: "center", maxWidth: 560, margin: "var(--space-5) auto 0" }}>
          {t.regalos.lead}
        </p>
        <div className="regalo-grid">
          {accounts.map((acc, ai) => (
            <div className="regalo-card reveal" key={ai}>
              <div className="info-icon"><Icon name="landmark" /></div>
              <h3>{acc.title}</h3>
              <div>
                {acc.rows.map(([k, v]) => {
                  const id = ai + "-" + k;
                  return (
                    <div key={id} className="bank-row">
                      <div>
                        <div className="bank-k">{k}</div>
                        <div className="bank-v">{v}</div>
                      </div>
                      <button className="copy-btn" onClick={() => copy(id, v)}>
                        <Icon name={copied === id ? "check" : "copy"} /> {copied === id ? t.regalos.copiado : t.regalos.copiar}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="regalo-card reveal">
            <div className="info-icon"><Icon name="mail" /></div>
            <h3>{t.regalos.sobreTitle}</h3>
            <p className="eb-body" style={{ margin: 0 }}>
              {t.regalos.sobreTexto}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { DressCode, Hoteles, Regalos });
