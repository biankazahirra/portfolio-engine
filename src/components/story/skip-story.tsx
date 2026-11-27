"use client";

interface SkipStoryProps {
  className?: string;
}

export function SkipStory({ className }: SkipStoryProps) {
  function skip() {
    document.documentElement.dataset.story = "skipped";
    try {
      sessionStorage.setItem("storySkipped", "1");
    } catch {
      // Storage may be blocked for this visit.
    }
    window.dispatchEvent(new Event("story:skip"));

    window.setTimeout(() => {
      const target = document.getElementById("at-a-glance");
      target?.scrollIntoView({ block: "start" });
      window.history.replaceState(null, "", "#at-a-glance");
    }, 80);
  }

  return (
    <button
      type="button"
      className={className ? `skip-story ${className}` : "skip-story"}
      onClick={skip}
    >
      Skip story
    </button>
  );
}
