import { ComponentType, useEffect, useState } from "react";

import { useRefreshToken } from "../hooks/use-refresh-token";
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
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const refreshToken = useRefreshToken();
    const { onRedirecting } = options;
    const username = getCookie(StoredCookies.USERNAME) || "";
    const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
    const isLogged = username && accessToken;

    useEffect(() => {
      if (!isRefreshing) {
        setIsRefreshing(true);
        refreshToken().finally(() => {
          setIsRefreshing(false);
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshToken]);

    return isLogged ? <Component /> : onRedirecting();
  };
};
