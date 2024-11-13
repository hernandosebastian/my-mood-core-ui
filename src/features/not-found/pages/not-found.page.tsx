import { useSEO } from "@/seo/hooks";
import { NotFound } from "../components";
import { notFoundSeoConfig } from "@/seo/config";

export function NotFoundPage(): JSX.Element {
  useSEO({
    title: notFoundSeoConfig.title,
    description: notFoundSeoConfig.description,
  });

  return <NotFound />;
}

