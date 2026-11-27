import { BloomIcon } from "../shared/bloom-icon";
import type { Chapter } from "@/types/chapter";

export function ChapterDots({ chapters }: { chapters: Chapter[] }) {
  return (
    <nav className="chapter-dots" aria-label="Story chapters">
      {chapters.map((chapter) => (
        <a
          key={chapter.id}
          className="chapter-dot"
          href={`#chapter-${chapter.number}`}
          data-dot={chapter.id}
          aria-label={`${String(chapter.number).padStart(2, "0")} — Chapter ${chapter.number}: ${chapter.label}`}
        >
          <span className="dot-flower">
            <BloomIcon />
          </span>
          <span className="dot-number">{String(chapter.number).padStart(2, "0")}</span>
        </a>
      ))}
    </nav>
  );
}
