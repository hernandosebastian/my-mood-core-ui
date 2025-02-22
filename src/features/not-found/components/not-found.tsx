import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/buttonVariants";

export function NotFound(): JSX.Element {
  return (
    <div
      className="flex items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      id="not-found-component"
      data-testid="not-found-container"
    >
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl text-text-primary font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
            404
          </h1>
          <p className="text-text-secondary">
            Looks like this mood hasn&apos;t made it into our emotional universe
            yet.
          </p>
        </div>
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "transition-colors"
          )}
          id="not-found-return-button"
          data-testid="not-found-return-button"
        >
          Return to website
        </Link>
      </div>
    </div>
  );
}
