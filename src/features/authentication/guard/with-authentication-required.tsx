import { ComponentType } from "react";

import { StoredCookies } from "@/services/cookies";
import { getCookie } from "@/services/cookies";

type WithAuthenticationRequiredOptions = {
  onRedirecting: () => JSX.Element;
};
export const withAuthenticationRequired = (
  Component: ComponentType,
  options: WithAuthenticationRequiredOptions
) => {
  return function WithAuthenticationRequired(): JSX.Element {
    const { onRedirecting } = options;
    const username = getCookie(StoredCookies.USERNAME) || "";
    const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
    const isLogged = username && accessToken;

    return isLogged ? <Component /> : onRedirecting();
  };
};
