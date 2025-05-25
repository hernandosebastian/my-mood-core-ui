import { whyTrackYourMoodData } from "../utils";
import { HomepageWhyTrackCard } from "./homepage-why-track-card";

export function HomepageWhyTrackYourMood(): JSX.Element {
  return (
    <section className="pb-8 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h2 className="text-3xl font-bold mb-12 text-center text-text-primary">
          ¿Por qué hacer un seguimiento de tu estado de ánimo?
        </h2>
        <div className="flex flex-col gap-8">
          {whyTrackYourMoodData.map((item) => (
            <HomepageWhyTrackCard
              key={item.title}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
