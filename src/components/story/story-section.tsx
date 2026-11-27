import { PageContainer } from "../layout/page-container";
import { AtAGlance } from "./at-a-glance";
import { ChapterBlock } from "./chapter";
import { ChapterDots } from "./chapter-dots";
import { StoryController } from "./story-controller";
import { StoryVine } from "./story-vine";
import { SkipStory } from "./skip-story";
import type { Chapter } from "@/types/chapter";
import type { SectionFrameProps } from "@/types/section";

interface StorySectionProps extends SectionFrameProps {
  chapters: Chapter[];
}

export function StorySection({ index, label, chapters }: StorySectionProps) {
  return (
    <section id="story" className="story">
      <PageContainer wide>
        <header className="story-header">
          <p className="eyebrow">
            {String(index).padStart(2, "0")} / {label}
          </p>
          <h2 className="story-title">The accounting cycle, in bloom.</h2>
          <p className="story-lead">
            Seven chapters, one growing plant. The story runs from first entry to closing the books.
          </p>
          <SkipStory className="story-skip" />
        </header>
      </PageContainer>

      <div className="story-stage">
        <StoryVine />
        <ChapterDots chapters={chapters} />
        <PageContainer wide>
          {chapters.map((chapter) => (
            <ChapterBlock key={chapter.id} chapter={chapter} />
          ))}
        </PageContainer>
      </div>

      <AtAGlance chapters={chapters} />
      <StoryController chapters={chapters} />
    </section>
  );
}
