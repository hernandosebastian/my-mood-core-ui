import { Card, CardContent } from "@/components/ui/card";

interface HomepageWhyTrackCardProps {
  image: string;
  title: string;
  description: string;
}

export function HomepageWhyTrackCard({
  image,
  title,
  description,
}: HomepageWhyTrackCardProps): JSX.Element {
  return (
    <Card className="bg-background-secondary border-border-primary shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="relative w-full h-56 sm:h-64 lg:h-96 bg-background-primary flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt={title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-center">
            <h3 className="text-xl font-semibold mb-3 text-text-primary">
              {title}
            </h3>
            <p className="text-text-secondary leading-relaxed">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
