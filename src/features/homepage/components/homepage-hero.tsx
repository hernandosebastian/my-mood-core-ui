import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCookie, StoredCookies } from "@/services/cookies";

export function HomepageHero(): JSX.Element {
  const username = getCookie(StoredCookies.USERNAME) || "";
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
  const isLoggedIn = username && accessToken;

  return (
    <div className="my-8 text-center flex flex-col gap-8">
      <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-text-primary">
        My Mood
      </h1>
      <p className="text-2xl text-text-secondary max-w-[600px] mx-auto">
        Una herramienta sencilla para seguir tus emociones y descubrir tus
        patrones de estado de ánimo a lo largo del tiempo.
      </p>
      <div className="flex gap-4 justify-center mt-2">
        {!isLoggedIn && (
          <Button asChild size="lg" className="w-32">
            <Link
              to="/iniciar-sesion"
              data-testid="homepage-get-started-button"
              draggable={false}
            >
              Comenzar
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
