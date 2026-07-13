/* RSVP — formulario con todos los campos del brief, guardado en localStorage */

const RSVP_KEY = "boda_xd_rsvps";

function loadRsvps() {
  try { return JSON.parse(localStorage.getItem(RSVP_KEY) || "[]"); } catch (e) { return []; }
}
function saveRsvp(record) {
  const all = loadRsvps();
  all.push(record);
  localStorage.setItem(RSVP_KEY, JSON.stringify(all));
}

const MAX_GUESTS = 10;

function Rsvp() {
  const { t } = useLang();
  const empty = {
    name: "", phone: "", attending: null,
    allergiesOther: "",
    song: "", message: "",
  };
  const [form, setForm] = React.useState(empty);
  const [errors, setErrors] = React.useState({});
  const [sent, setSent] = React.useState(false);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t.rsvp.errNombre;
    if (!form.phone.trim()) e.phone = t.rsvp.errTelefono;
    if (form.attending === null) e.attending = t.rsvp.errAsistencia;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    saveRsvp({
      ...form,
      allergiesOther: form.allergiesOther.trim(),
      ts: new Date().toISOString(),
    });
    setSent(true);
  };

  const reset = () => { setForm(empty); setSent(false); setErrors({}); };

  const firstName = form.name.trim().split(" ")[0] || "";

  return (
    <section className="section rsvp" id="rsvp">
      <div className="wrap-narrow">
        <div className="reveal">
          <SectionHead eyebrow={t.rsvp.eyebrow} title={t.rsvp.title} />
        </div>

        {sent ? (
          <div className="rsvp-card reveal in">
            <div className="rsvp-success">
              <div className="check"><Icon name="check" /></div>
              <h3>{t.rsvp.gracias.replace("{name}", firstName)}</h3>
              <p>
                {form.attending === "yes" ? t.rsvp.graciasSi : t.rsvp.graciasNo}
              </p>
              {form.attending === "yes" && (
                <div className="cal-actions" style={{ marginTop: 22 }}>
                  <a className="btn btn-primary" href={googleCalUrl()} target="_blank" rel="noreferrer">
                    <Icon name="calendar-plus" /> {t.rsvp.gcal}
                  </a>
                  <button className="btn btn-ghost" onClick={downloadICS}>
                    <Icon name="download" /> {t.rsvp.ics}
                  </button>
                </div>
              )}
              <button className="btn btn-soft" onClick={reset} style={{ marginTop: 18 }}>{t.rsvp.otraRespuesta}</button>
            </div>
          </div>
        ) : (
          <form className="rsvp-card reveal" onSubmit={submit} noValidate>
            <div className="field-row">
              <div className="field">
                <label>{t.rsvp.nombre} <span className="req">{t.rsvp.req}</span></label>
                <input className={"input" + (errors.name ? " err" : "")} value={form.name}
                  onChange={e => set("name", e.target.value)} placeholder={t.rsvp.nombrePh} />
                {errors.name && <span className="field-err">{errors.name}</span>}
              </div>
              <div className="field">
                <label>{t.rsvp.telefono} <span className="req">{t.rsvp.req}</span></label>
                <input className={"input" + (errors.phone ? " err" : "")} value={form.phone}
                  inputMode="tel"
                  onChange={e => set("phone", e.target.value)} placeholder={t.rsvp.telefonoPh} />
                {errors.phone && <span className="field-err">{errors.phone}</span>}
              </div>
            </div>

            <div className="field">
              <label>{t.rsvp.acompanar} <span className="req">{t.rsvp.req}</span></label>
              <div className="seg">
                <button type="button" className={form.attending === "yes" ? "on-yes" : ""}
                  onClick={() => set("attending", "yes")}>{t.rsvp.si}</button>
                <button type="button" className={form.attending === "no" ? "on-no" : ""}
                  onClick={() => set("attending", "no")}>{t.rsvp.no}</button>
              </div>
              {errors.attending && <span className="field-err">{errors.attending}</span>}
            </div>

            {form.attending === "yes" && (
              <React.Fragment>
                <div className="field">
                  <label>{t.rsvp.alergias}</label>
                  <input className="input" value={form.allergiesOther}
                    onChange={e => set("allergiesOther", e.target.value)}
                    placeholder={t.rsvp.alergiasPh} />
                </div>

                <div className="field">
                  <label>{t.rsvp.cancion}</label>
                  <input className="input" value={form.song}
                    onChange={e => set("song", e.target.value)}
                    placeholder={t.rsvp.cancionPh} />
                </div>
              </React.Fragment>
            )}

            <div className="field">
              <label>{t.rsvp.mensaje}</label>
              <textarea className="input" value={form.message}
                onChange={e => set("message", e.target.value)}
                placeholder={t.rsvp.mensajePh} />
            </div>

            <button type="submit" className="btn btn-primary rsvp-submit">
              <Icon name="send" /> {t.rsvp.enviar}
            </button>
            <p className="rsvp-note">{t.rsvp.nota}</p>
          </form>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Rsvp, RSVP_KEY, loadRsvps, saveRsvp });
