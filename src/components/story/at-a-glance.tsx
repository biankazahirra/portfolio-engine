import type { Chapter } from "@/types/chapter";

export function AtAGlance({ chapters }: { chapters: Chapter[] }) {
  return (
    <section id="at-a-glance" className="at-a-glance section">
      <div className="container-content">
        <p className="eyebrow">At a glance</p>
        <h3 className="glance-title">Every role, without the story.</h3>
        <ul className="glance-grid">
          {chapters.slice(0, 6).map((chapter) => (
            <li key={chapter.id} className="glance-card">
              <p className="glance-number">{String(chapter.number).padStart(2, "0")}</p>
              <p className="glance-role">{chapter.title}</p>
              <p className="metadata">{chapter.meta}</p>
              <p className="glance-takeaway">{chapter.takeaway}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
