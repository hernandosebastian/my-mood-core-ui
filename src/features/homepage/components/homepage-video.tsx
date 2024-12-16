export function HomepageVideo(): JSX.Element {
  return (
    <div className="relative w-full max-w-[1000px] aspect-video rounded-lg overflow-hidden shadow-xl">
      <video
        className="w-full h-full object-cover"
        src="src/assets/homepage/homepage-example.mp4"
        title="Mood tracking video experience"
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        aria-label="Illustrative video showing mood tracking experience"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
