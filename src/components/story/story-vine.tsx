export function StoryVine() {
  return (
    <>
      <svg
        className="story-vine"
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="story-vine-path"
          d="M30 0 C 14 180, 46 340, 30 500 C 14 660, 46 820, 30 1000"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="story-progress" aria-hidden="true">
        <span className="story-progress-bar" />
      </div>
    </>
  );
}
