import { ChapterScene } from "./chapter-scene";
import type { Chapter } from "@/types/chapter";

export function ChapterBlock({ chapter }: { chapter: Chapter }) {
  return (
    <section
      id={`chapter-${chapter.number}`}
      className="story-chapter"
      data-chapter={chapter.id}
      aria-labelledby={`chapter-title-${chapter.number}`}
    >
      <div className="chapter-inner">
        <div className="chapter-copy">
          <p className="chapter-label">
            CH. {String(chapter.number).padStart(2, "0")} / {chapter.label}
          </p>
          <h3 className="chapter-title" id={`chapter-title-${chapter.number}`}>
            {chapter.title}
          </h3>
          <p className="chapter-meta">{chapter.meta}</p>
          <p className="chapter-takeaway">{chapter.takeaway}</p>

          <details className="chapter-details">
            <summary>Details</summary>
            {chapter.details.map((detail) => (
              <div key={detail.heading} className="chapter-detail">
                <h4 className="chapter-detail-title">{detail.heading}</h4>
                <ul className="bullet-list">
                  {detail.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </details>
        </div>

        <div className="chapter-visual">
          <ChapterScene kind={chapter.scene} />
        </div>
      </div>
    </section>
  );
}
