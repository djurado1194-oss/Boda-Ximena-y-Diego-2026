/* Preguntas frecuentes — acordeón simple */

function FaqItem({ item, open, onToggle }) {
  return (
    <div className={"faq-item" + (open ? " open" : "")}>
      <button type="button" className="faq-q" onClick={onToggle} aria-expanded={open}>
        <span>{item.q}</span>
        <Icon name="chevron-down" className="faq-chev" />
      </button>
      <div className="faq-a-wrap">
        <p className="faq-a">{renderFaqAnswer(item.a)}</p>
      </div>
    </div>
  );
}

function renderFaqAnswer(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part));
}

function Faq() {
  const [openIdx, setOpenIdx] = React.useState(0);
  const { t } = useLang();
  const items = t.faq.items.map(([q, a]) => ({ q, a }));

  return (
    <section className="section faq" id="faq">
      <div className="wrap-narrow">
        <div className="reveal">
          <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </div>
        <div className="faq-list reveal">
          {items.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Faq });
