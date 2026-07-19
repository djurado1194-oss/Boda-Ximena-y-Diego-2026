/* Internacionalización: contexto de idioma (es/en) + diccionario de textos */

const LANG_KEY = "boda_xd_lang";

const LangContext = React.createContext({ lang: "es", t: {}, toggle: () => {} });

function useLang() {
  return React.useContext(LangContext);
}

const DICT = {
  es: {
    nav: {
      programa: "Programa", lugares: "Ubicaciones", dress: "Vestimenta",
      regalos: "Regalos", hoteles: "Hoteles", faq: "Preguntas",
      confirmar: "Confirmar", confirmarAsistencia: "Confirmar asistencia",
    },
    intro: {
      abrir: "Abrir la invitación",
      deslizando: "Sigue deslizando…",
      toca: "Presiona aquí",
      bendicion: "Con la bendición de Dios y nuestras familias",
      fecha: "Sábado · 21 de noviembre · 2026",
    },
    hero: {
      bendicion: "Con la bendición de Dios y nuestras familias",
      fecha: "Sábado, 21 de noviembre de 2026",
      lugar: "Iglesia El Calvario · Hotel Mestizo Cortijo",
      hoy: "¡Hoy nos casamos!",
      dias: "Días", horas: "Horas", minutos: "Minutos", segundos: "Segundos",
    },
    programa: {
      eyebrow: "El gran día", title: "Programa",
      items: [
        ["14:00", "Ceremonia religiosa", "Iglesia El Calvario"],
        ["17:00", "Cóctel de bienvenida", "Hotel Mestizo Cortijo"],
        ["18:00", "Recepción", "Hotel Mestizo Cortijo"],
        ["23:00", "Last Dance", "Hotel Mestizo Cortijo"],
      ],
    },
    lugares: {
      eyebrow: "Dónde celebraremos", title: "Ubicaciones",
      ceremonia: "La ceremonia · 2:00 pm",
      recepcion: "La recepción · 5:00 pm",
      iglesiaNombre: "Iglesia El Calvario",
      iglesiaDir: "Callejón del Calvario 170, Antigua Guatemala",
      hotelNombre: "Hotel Mestizo Cortijo",
      hotelDir: "0 Calle 2-75, Zona 5, Ciudad Vieja, Sacatepéquez",
      gmaps: "Google Maps", waze: "Waze",
    },
    dress: {
      eyebrow: "Cómo vestir", title: "Etiqueta Formal",
      hombresTitle: "Hombres", hombresSub: "Traje formal con corbata",
      mujeresTitle: "Mujeres", mujeresSub: "Vestido largo",
      notaMujeresLabel: "Mujeres:",
      notaMujeres: "no utilicen vestidos blancos ni negros, ya que estos colores están reservados para la novia y las damas.",
      notaTitulo: "Toma en cuenta:",
      notaAireLibre: "Será un evento al",
      notaAireLibreBold: "aire libre.",
    },
    hoteles: {
      eyebrow: "Para tu estancia", title: "Dónde hospedarte",
      hotelesTab: "Hoteles", airbnbTab: "Airbnb",
      introHoteles: "Seleccionamos algunas opciones para que puedas disfrutar de Antigua Guatemala y descansar como se debe. Estas son solo algunas sugerencias cerca del venue, pero puedes hospedarte donde prefieras.",
      introAirbnb: "Seleccionamos algunas casas cercanas al venue en Airbnb, ideales para grupos y familias que quieran quedarse juntos. Estas son solo algunas sugerencias; al final, hospédate donde mejor te acomodes.",
      cerca: "Cerca de Cortijo Mestizo",
      reservar: "Reservar",
      verAirbnb: "Ver en Airbnb",
      verLista: "Ver la lista completa en Airbnb",
      seleccionada: "Seleccionada por los novios",
      hotels: [
        ["Hotel Soleil La Antigua", "Tarifa especial · pendiente"],
        ["Mestizo Centro", "TARIFA ESPECIAL · 10% DE DESCUENTO"],
        ["Camino Real Antigua", "Tarifa especial · pendiente"],
      ],
      airbnbs: [
        "Casa Amanecer Colonial", "Casa Grande", "Casa Laura",
      ],
    },
    regalos: {
      eyebrow: "Si deseas regalarnos algo", title: "Mesa de regalos",
      lead: "Tu presencia es nuestro mejor regalo. Si quieres apoyarnos en el inicio de esta nueva etapa, te ofrecemos varias opciones.",
      cuentas: [
        { title: "🇬🇹 Banco Industrial (GTQ)",
          rows: [["Cuenta de ahorro en Qtz", "6340166"], ["A nombre de", "Ximena & Diego"]] },
        { title: "🇵🇦 Banco General (USD)",
          rows: [["Cuenta de ahorro en USD", "04-10-96-252459-0"], ["A nombre de", "Diego Jurado"]] },
        { title: "🇺🇸 ZELLE (USD)",
          rows: [["Email", "diegojurado94@hotmail.com"], ["Name", "Diego Jurado"]] },
      ],
      sobreTitle: "Sobres de efectivo",
      sobreTexto: "Si lo prefieres, también puedes entregarnos un sobre en efectivo el día de la boda. Habrá un buzón especial el día del evento.",
      copiar: "Copiar", copiado: "Copiado",
    },
    faq: {
      eyebrow: "Antes de venir", title: "Preguntas frecuentes",
      items: [
        ["¿Los niños están invitados?", "No, hemos decidido que nuestra boda sea solo para **adultos**."],
        ["¿Podemos llevar a alguien que no está en la invitación?", "No, la invitación es exclusiva para las personas previamente contactadas."],
        ["¿Con cuánta anticipación debemos llegar a la ceremonia?", "Te sugerimos llegar al menos 20–30 minutos antes de la ceremonia (2:00 pm) para encontrar estacionamiento."],
        ["¿Dónde podemos estacionarnos?", "Para la ceremonia religiosa, puedes estacionarte en la vía pública frente a la iglesia o en los parqueos públicos cercanos. Para la recepción, el Hotel Mestizo Cortijo ofrece parqueo gratuito dentro del venue."],
        ["¿Podemos llevar mascotas?", "Por el tipo de evento, no será posible llevar mascotas ni a la ceremonia ni a la recepción. Gracias por su comprensión."],
        ["¿Cómo podemos contactarlos si tenemos dudas?", "Puedes escribirnos directamente por WhatsApp o dejarnos tu duda en el mensaje del formulario de confirmación y te responderemos con gusto."],
      ],
    },
    rsvp: {
      eyebrow: "¿Nos acompañas?", title: "Confirma tu asistencia",
      nombre: "Nombre completo", telefono: "Teléfono",
      nombrePh: "Tu nombre y apellido", telefonoPh: "+502 0000 0000",
      acompanar: "¿Podrás acompañarnos?", si: "Sí, ahí estaré", no: "No podré asistir",
      alergias: "Alergias e intolerancias", alergiasPh: "Alérgico a… (o vegetariano, vegano…)",
      cancion: "Canción favorita", cancionPh: "La que no puede faltar en la fiesta",
      mensaje: "Mensaje para la pareja (opcional)", mensajePh: "Déjanos unas palabras con cariño…",
      enviar: "Enviar confirmación",
      notaPre: "Esta confirmación es", notaBold: "personal", notaPost: ". Recuérdale a tu acompañante que envíe su confirmación.",
      gracias: "¡Gracias, {name}!",
      graciasSi: "Recibimos tu confirmación. ¡No podemos esperar para celebrar contigo!",
      graciasNo: "Lamentamos que no puedas acompañarnos. Gracias por avisarnos con cariño.",
      gcal: "Google Calendar", ics: "Apple / Outlook (.ics)",
      otraRespuesta: "Enviar otra respuesta",
      errNombre: "Por favor escribe tu nombre",
      errTelefono: "Necesitamos un teléfono de contacto",
      errAsistencia: "Cuéntanos si podrás acompañarnos",
      req: "*",
    },
    footer: {
      fecha: "Sábado, 21 de noviembre de 2026 · Guatemala",
      esperamos: "Con amor, los esperamos",
      replay: "Ver la introducción otra vez",
    },
  },
  en: {
    nav: {
      programa: "Schedule", lugares: "Venues", dress: "Dress code",
      regalos: "Gifts", hoteles: "Hotels", faq: "FAQ",
      confirmar: "RSVP", confirmarAsistencia: "RSVP now",
    },
    intro: {
      abrir: "Open the invitation",
      deslizando: "Keep sliding…",
      toca: "Press here",
      bendicion: "With God's blessing and our families",
      fecha: "Saturday · November 21st · 2026",
    },
    hero: {
      bendicion: "With God's blessing and our families",
      fecha: "Saturday, November 21st, 2026",
      lugar: "Iglesia El Calvario · Hotel Mestizo Cortijo",
      hoy: "We're getting married today!",
      dias: "Days", horas: "Hours", minutos: "Minutes", segundos: "Seconds",
    },
    programa: {
      eyebrow: "The big day", title: "Schedule",
      items: [
        ["14:00", "Religious ceremony", "Iglesia El Calvario"],
        ["17:00", "Welcome cocktail", "Hotel Mestizo Cortijo"],
        ["18:00", "Reception", "Hotel Mestizo Cortijo"],
        ["23:00", "Last Dance", "Hotel Mestizo Cortijo"],
      ],
    },
    lugares: {
      eyebrow: "Where we'll celebrate", title: "Venues",
      ceremonia: "The ceremony · 2:00 pm",
      recepcion: "The reception · 5:00 pm",
      iglesiaNombre: "Iglesia El Calvario",
      iglesiaDir: "Callejón del Calvario 170, Antigua Guatemala",
      hotelNombre: "Hotel Mestizo Cortijo",
      hotelDir: "0 Calle 2-75, Zona 5, Ciudad Vieja, Sacatepéquez",
      gmaps: "Google Maps", waze: "Waze",
    },
    dress: {
      eyebrow: "What to wear", title: "Formal Attire",
      hombresTitle: "Men", hombresSub: "Formal suit with tie",
      mujeresTitle: "Women", mujeresSub: "Long dress",
      notaMujeresLabel: "Women:",
      notaMujeres: "please avoid wearing white or black, as these colors are reserved for the bride and her bridesmaids.",
      notaTitulo: "Please note:",
      notaAireLibre: "This will be an",
      notaAireLibreBold: "outdoor event.",
    },
    hoteles: {
      eyebrow: "For your stay", title: "Where to stay",
      hotelesTab: "Hotels", airbnbTab: "Airbnb",
      introHoteles: "We've picked a few options so you can enjoy Antigua Guatemala and rest well. These are just a few suggestions near the venue, but feel free to stay wherever you prefer.",
      introAirbnb: "We've picked a few nearby Airbnb homes, great for groups and families who'd like to stay together. These are just suggestions — stay wherever suits you best.",
      cerca: "Near Cortijo Mestizo",
      reservar: "Book now",
      verAirbnb: "View on Airbnb",
      verLista: "See the full list on Airbnb",
      seleccionada: "Chosen by the couple",
      hotels: [
        ["Hotel Soleil La Antigua", "Special rate · pending"],
        ["Mestizo Centro", "SPECIAL RATE · 10% OFF"],
        ["Camino Real Antigua", "Special rate · pending"],
      ],
      airbnbs: [
        "Casa Amanecer Colonial", "Casa Grande", "Casa Laura",
      ],
    },
    regalos: {
      eyebrow: "If you'd like to give us a gift", title: "Gift registry",
      lead: "Your presence is our greatest gift. If you'd also like to spoil us, here are a few options.",
      cuentas: [
        { title: "🇬🇹 Banco Industrial (GTQ)",
          rows: [["Savings account (GTQ)", "6340166"], ["Account name", "Ximena & Diego"]] },
        { title: "🇵🇦 Banco General (USD)",
          rows: [["Savings account (USD)", "04-10-96-252459-0"], ["Account name", "Diego Jurado"]] },
        { title: "🇺🇸 ZELLE (USD)",
          rows: [["Email", "diegojurado94@hotmail.com"], ["Name", "Diego Jurado"]] },
      ],
      sobreTitle: "Cash envelopes",
      sobreTexto: "If you'd rather, you can also give us a cash envelope on the wedding day. There will be a special box on the day of the event.",
      copiar: "Copy", copiado: "Copied",
    },
    faq: {
      eyebrow: "Before you come", title: "Frequently asked questions",
      items: [
        ["Are kids invited?", "No, we've decided our wedding will be **adults-only**."],
        ["Can we bring someone not on the invitation?", "No, the invitation is exclusive to the people previously contacted."],
        ["How early should we arrive?", "We suggest arriving at least 20–30 minutes before the ceremony (2:00 pm) to find parking."],
        ["Where can we park?", "For the religious ceremony, you can park on the public street in front of the church or in nearby public parking lots. For the reception, Hotel Mestizo Cortijo offers free on-site parking."],
        ["Can we bring pets?", "Due to the nature of the event, pets won't be allowed at either the ceremony or the reception. Thank you for understanding."],
        ["How can we reach you with questions?", "You can message us directly on WhatsApp or leave your question in the RSVP form's message field, and we'll get back to you gladly."],
      ],
    },
    rsvp: {
      eyebrow: "Will you join us?", title: "RSVP",
      nombre: "Full name", telefono: "Phone",
      nombrePh: "Your first and last name", telefonoPh: "+1 000 000 0000",
      acompanar: "Will you be able to join us?", si: "Yes, I'll be there", no: "I won't be able to attend",
      alergias: "Allergies & intolerances", alergiasPh: "Allergic to… (or vegetarian, vegan…)",
      cancion: "Favorite song", cancionPh: "The one that must play at the party",
      mensaje: "Message for the couple (optional)", mensajePh: "Leave us a few kind words…",
      enviar: "Send RSVP",
      notaPre: "This RSVP is", notaBold: "personal", notaPost: ". Please remind your companion to send their own RSVP.",
      gracias: "Thank you, {name}!",
      graciasSi: "We received your RSVP. We can't wait to celebrate with you!",
      graciasNo: "We're sorry you can't join us. Thank you for letting us know.",
      gcal: "Google Calendar", ics: "Apple / Outlook (.ics)",
      otraRespuesta: "Send another response",
      errNombre: "Please enter your name",
      errTelefono: "We need a contact phone number",
      errAsistencia: "Let us know if you'll be able to join us",
      req: "*",
    },
    footer: {
      fecha: "Saturday, November 21st, 2026 · Guatemala",
      esperamos: "With love, we can't wait to see you",
      replay: "Watch the intro again",
    },
  },
};

function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem(LANG_KEY) || "es"; } catch (e) { return "es"; }
  });

  const setAndPersist = (l) => {
    setLang(l);
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
  };
  const toggle = () => setAndPersist(lang === "es" ? "en" : "es");

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, t: DICT[lang], setLang: setAndPersist, toggle };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

function LangSwitch({ className = "" }) {
  const { lang, toggle } = useLang();
  return (
    <button
      type="button"
      className={"lang-switch " + className}
      onClick={toggle}
      aria-label="Switch language / Cambiar idioma"
      title="Switch language / Cambiar idioma"
    >
      <span className={lang === "es" ? "is-on" : ""}>ES</span>
      <span className="lang-sep">/</span>
      <span className={lang === "en" ? "is-on" : ""}>EN</span>
    </button>
  );
}

Object.assign(window, { LangProvider, useLang, LangSwitch, LANG_KEY, DICT });
