export function HomepageVideo(): JSX.Element {
  return (
    <div className="bg-background-primary relative w-full max-w-[1000px] aspect-video rounded-lg overflow-hidden shadow-xl border-2 border-border-primary">
      <video
        className="w-full h-full object-cover"
        src="/assets/homepage/homepage-example.mp4"
        title="Experiencia de seguimiento del estado de ánimo en video"
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        aria-label="Video ilustrativo mostrando la experiencia de seguimiento del estado de ánimo"
      >
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
}
