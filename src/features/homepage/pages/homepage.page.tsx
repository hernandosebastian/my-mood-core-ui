import { Separator } from "@/components/ui/separator";
import {
  HomepageHero,
  HomepageVideo,
  HomepageWhyTrackYourMood,
} from "../components";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getCookie, StoredCookies } from "@/services/cookies";

export function Homepage(): JSX.Element {
  const username = getCookie(StoredCookies.USERNAME) || "";
  const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
  const isLoggedIn = username && accessToken;

  return (
    <div className="min-h-screen flex flex-col" data-testid="homepage-section">
      <main className="flex-grow flex flex-col items-center justify-center space-y-16 px-4 py-16">
        <HomepageHero />
        <HomepageVideo />
      </main>
      <Separator
        orientation="vertical"
        className="w-full h-[1px] bg-border-primary my-4"
      />
      <HomepageWhyTrackYourMood />
      <div className="flex gap-4 justify-center mt-10">
        {!isLoggedIn && (
          <Button asChild size="lg" className="w-42">
            <Link
              to="/iniciar-sesion"
              data-testid="homepage-get-started-button-two"
              draggable={false}
            >
              Tu historia emocional empieza acá
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
