/* Compartidos: icono Lucide, encabezado de sección, utilidades de calendario */

function Icon({ name, className = "" }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    i.setAttribute("class", "ic " + className);
    host.appendChild(i);
    try { window.lucide.createIcons(); } catch (e) {}
  }, [name, className]);
  return <span ref={ref} style={{ display: "inline-flex" }}></span>;
}

function SectionHead({ eyebrow, title, reverse }) {
  if (reverse) {
    return (
      <div className="section-head">
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span className="eyebrow">{eyebrow}</span>
        <img className="divider-sprig" src="assets/sprig.svg" alt="" />
      </div>
    );
  }
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 style={{ margin: 0 }}>{title}</h2>
      <img className="divider-sprig" src="assets/sprig.svg" alt="" />
    </div>
  );
}

/* ---- Datos del evento (zona horaria fija: Guatemala, UTC-6) ----
   Ceremonia religiosa 3:00 pm GT = 21:00 UTC. Fin de fiesta ~12:00 am = 06:00 UTC (+1 día). */
const EVENT = {
  title: "Boda de Ximena & Diego",
  details: "¡Acompáñanos a celebrar nuestra boda! La ceremonia religiosa será en el Templo del Calvario (3:00 pm) y la recepción en el Jardín Mestizo Cortijo (5:00pm). Con cariño, Ximena y Diego.\n\nPlease join us to celebrate our wedding! The religious ceremony will be at Templo del Calvario (3:00 PM) and the reception at Jardín Mestizo Cortijo (5:00 PM). With love, Ximena and Diego.",
  location: "Templo del Calvario y Cortijo Mestizo, Guatemala",
  startUTC: "20261121T210000Z",
  endUTC:   "20261122T060000Z",
};

function googleCalUrl() {
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT.title,
    dates: `${EVENT.startUTC}/${EVENT.endUTC}`,
    details: EVENT.details,
    location: EVENT.location,
  });
  return "https://calendar.google.com/calendar/render?" + p.toString();
}

function downloadICS() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Boda XD//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:boda-ximena-diego-20261121@invitacion",
    "DTSTAMP:" + EVENT.startUTC,
    "DTSTART:" + EVENT.startUTC,
    "DTEND:" + EVENT.endUTC,
    "SUMMARY:" + EVENT.title,
    "DESCRIPTION:" + EVENT.details.replace(/,/g, "\\,").replace(/\n/g, "\\n"),
    "LOCATION:" + EVENT.location.replace(/,/g, "\\,"),
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "Boda-Ximena-y-Diego.ics";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

Object.assign(window, { Icon, SectionHead, EVENT, googleCalUrl, downloadICS });
