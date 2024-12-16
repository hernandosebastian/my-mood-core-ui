import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { whyTrackYourMoodData } from "../utils";

export function HomepageWhyTrackYourMood(): JSX.Element {
  return (
    <section className="pb-16 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Why Track Your Mood?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyTrackYourMoodData.map((item) => (
            <Card
              key={item.title}
              className="bg-white border-gray-200 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-4 text-gray-800">
                  <item.icon className="w-8 h-8 text-gray-600" />
                  <span>{item.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
