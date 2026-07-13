/* Panel de administrador oculto (contraseña) — confirmaciones + export CSV/JSON */

const ADMIN_PASS = "!BodaXD21112026";

function fmtDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-GT", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  } catch (e) { return iso; }
}

function guestCount(r) {
  if (r.guests != null) return r.guests;
  return 1 + (r.plusOne ? 1 : 0); /* registros antiguos */
}
function allergyText(r) {
  if (Array.isArray(r.allergyTags) || r.allergiesOther != null) {
    const parts = (r.allergyTags || []).slice();
    if (r.allergiesOther) parts.push(r.allergiesOther);
    return parts.join(", ") || "Ninguna";
  }
  return r.allergies || "—"; /* registros antiguos */
}

function guestNamesText(r) {
  const names = (r.guestNames || []).map(n => (n || "").trim()).filter(Boolean);
  return names.length ? names.join(", ") : "—";
}

function csvCell(v) {
  const s = (v == null ? "" : String(v));
  return '"' + s.replace(/"/g, '""') + '"';
}

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportCSV(rows) {
  const headers = ["Fecha", "Nombre", "Teléfono", "Asiste", "Invitados", "Acompañantes", "Alergias / restricciones", "Canción", "Hospedaje", "Mensaje"];
  const lines = [headers.map(csvCell).join(",")];
  rows.forEach(r => {
    lines.push([
      fmtDate(r.ts), r.name, r.phone,
      r.attending === "yes" ? "Sí" : "No",
      r.attending === "yes" ? guestCount(r) : "",
      r.attending === "yes" ? guestNamesText(r) : "",
      r.attending === "yes" ? allergyText(r) : "",
      r.song, r.lodging, r.message,
    ].map(csvCell).join(","));
  });
  /* BOM para que Excel reconozca UTF-8 */
  downloadFile("confirmaciones-boda-XD.csv", "﻿" + lines.join("\r\n"), "text/csv;charset=utf-8");
}

function exportJSON(rows) {
  downloadFile("confirmaciones-boda-XD.json", JSON.stringify(rows, null, 2), "application/json");
}

function Admin() {
  const [open, setOpen] = React.useState(false);
  const [authed, setAuthed] = React.useState(false);
  const [pass, setPass] = React.useState("");
  const [err, setErr] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const refresh = () => setRows(loadRsvps().slice().reverse());

  const openPanel = () => { setOpen(true); refresh(); };
  const close = () => { setOpen(false); setPass(""); setErr(false); };

  const tryLogin = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) { setAuthed(true); setErr(false); refresh(); }
    else setErr(true);
  };

  const going = rows.filter(r => r.attending === "yes");
  const headcount = going.reduce((n, r) => n + guestCount(r), 0);

  return (
    <React.Fragment>
      <button className="admin-fab" title="Administrador" onClick={openPanel} aria-label="Administrador">
        <Icon name="lock" />
      </button>

      {open && (
        <div className="admin-overlay" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="admin-modal">
            <div className="admin-head">
              <h3>{authed ? "Confirmaciones" : "Acceso de administrador"}</h3>
              <button className="admin-x" onClick={close} aria-label="Cerrar"><Icon name="x" /></button>
            </div>

            {!authed ? (
              <form className="admin-login" onSubmit={tryLogin}>
                <p className="eb-body" style={{ margin: 0, textAlign: "center" }}>
                  Introduce la contraseña para ver las confirmaciones.
                </p>
                <input
                  type="password"
                  className="input-light"
                  value={pass}
                  onChange={e => { setPass(e.target.value); setErr(false); }}
                  placeholder="Contraseña"
                  autoFocus
                />
                {err && <span className="field-err" style={{ textAlign: "center", color: "#b06a4a" }}>Contraseña incorrecta.</span>}
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }}>
                  <Icon name="unlock" /> Entrar
                </button>
              </form>
            ) : (
              <React.Fragment>
                <div className="admin-stats">
                  <div className="stat"><div className="n">{rows.length}</div><div className="l">Respuestas</div></div>
                  <div className="stat"><div className="n">{going.length}</div><div className="l">Confirman</div></div>
                  <div className="stat"><div className="n">{headcount}</div><div className="l">Personas (con +1)</div></div>
                  <div className="stat"><div className="n">{rows.length - going.length}</div><div className="l">No asisten</div></div>
                </div>

                <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
                  <button className="btn btn-soft" onClick={() => exportCSV(loadRsvps())}><Icon name="file-spreadsheet" /> Descargar Excel (CSV)</button>
                  <button className="btn btn-ghost" onClick={() => exportJSON(loadRsvps())}><Icon name="braces" /> Descargar JSON</button>
                  <button className="btn btn-ghost" onClick={refresh}><Icon name="refresh-cw" /> Actualizar</button>
                </div>

                {rows.length === 0 ? (
                  <div className="admin-empty">Aún no hay confirmaciones.</div>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Fecha</th><th>Nombre</th><th>Teléfono</th><th>Asiste</th>
                          <th>Invitados</th><th>Acompañantes</th><th>Alergias / restricciones</th><th>Canción</th><th>Hospedaje</th><th>Mensaje</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => (
                          <tr key={i}>
                            <td style={{ whiteSpace: "nowrap" }}>{fmtDate(r.ts)}</td>
                            <td style={{ fontWeight: 600, color: "var(--fg)" }}>{r.name}</td>
                            <td style={{ whiteSpace: "nowrap" }}>{r.phone}</td>
                            <td>{r.attending === "yes" ? <span className="pill-yes">Sí</span> : <span className="pill-no">No</span>}</td>
                            <td style={{ textAlign: "center" }}>{r.attending === "yes" ? guestCount(r) : "—"}</td>
                            <td>{r.attending === "yes" ? guestNamesText(r) : "—"}</td>
                            <td>{r.attending === "yes" ? allergyText(r) : "—"}</td>
                            <td>{r.song || "—"}</td>
                            <td>{r.lodging || "—"}</td>
                            <td style={{ maxWidth: 220 }}>{r.message || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function Footer({ onReplayIntro }) {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="f-mark">Ximena &amp; Diego</div>
      <img className="f-sprig" src="assets/sprig.svg" alt="" />
      <div className="f-meta">{t.footer.fecha}<br />{t.footer.esperamos}</div>
      {onReplayIntro && (
        <button className="replay-intro" onClick={onReplayIntro}>
          <Icon name="mail-open" /> {t.footer.replay}
        </button>
      )}
    </footer>
  );
}

Object.assign(window, { Admin, Footer, ADMIN_PASS });
