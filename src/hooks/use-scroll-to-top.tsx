import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface IUseScrollToTopProps {
  dependency?: unknown | unknown[];
}

export const useScrollToTop = (props?: IUseScrollToTopProps): void => {
  const { pathname } = useLocation();
  const { dependency } = props || {};
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
      isFirstRender.current = false;
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, dependency]);
};
