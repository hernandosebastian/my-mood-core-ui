import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { whyTrackYourMoodData } from "../utils";

export function HomepageWhyTrackYourMood(): JSX.Element {
  return (
    <section className="pb-16 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-text-primary">
          Why Track Your Mood?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyTrackYourMoodData.map((item) => (
            <Card
              key={item.title}
              className="bg-background-secondary border-border-primary shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out hover:text-accent-secondary group"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-4 text-text-primary group-hover:text-accent-secondary transition-colors duration-300 ease-in-out">
                  <item.icon className="w-8 h-8 text-accent-secondary transition-colors duration-300 ease-in-out" />
                  <span>{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-secondary group-hover:text-text-primary transition-colors duration-300 ease-in-out">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
