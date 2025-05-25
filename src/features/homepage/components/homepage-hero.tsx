import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCookie, StoredCookies } from "@/services/cookies";

export function HomepageHero(): JSX.Element {
  const username = getCookie(StoredCookies.USERNAME) || "";
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
  const isLoggedIn = username && accessToken;

  return (
    <div className="text-center flex flex-col">
      <h1 className="text-5xl font-bold tracking-tight mb-4">My Mood</h1>
      <p className="text-2xl text-text-primary mb-2">
        Tu diario emocional digital.
      </p>
      <p className="text-lg text-text-secondary max-w-lg mx-auto">
        Registrá tus emociones, escribí cómo te sentís y descubrí tus patrones
        emocionales en el tiempo.
      </p>

      <div className="flex gap-4 justify-center mt-10">
        {!isLoggedIn && (
          <Button asChild size="lg" className="w-42">
            <Link
              to="/iniciar-sesion"
              data-testid="homepage-get-started-button"
              draggable={false}
            >
              Empezá hoy — Es gratis
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
