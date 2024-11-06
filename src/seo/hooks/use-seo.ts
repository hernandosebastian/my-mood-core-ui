import { useEffect } from "react";

interface IUseSeoProps {
  title?: string;
  description?: string;
}

export const useSEO = ({ title, description }: IUseSeoProps): null => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description !== undefined) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", description || "");
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = description || "";
        document.head.appendChild(newMeta);
      }
    }
  }, [title, description]);

  return null;
};

