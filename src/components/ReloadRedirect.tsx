import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPageReload, prepareHomeIntro, resetScrollRestoration, SPA_ROUTES } from "@/lib/intro";

/** On reload: unknown routes go to `/`; home resets scroll/hash for the intro. */
export const ReloadRedirect = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const isKnownRoute = SPA_ROUTES.includes(pathname as (typeof SPA_ROUTES)[number]);

    if (!isKnownRoute) {
      if (isPageReload()) {
        window.location.replace(import.meta.env.BASE_URL);
      }
      return;
    }

    if (pathname === "/") {
      prepareHomeIntro();
    }

    return () => {
      resetScrollRestoration();
    };
  }, [pathname]);

  return null;
};
