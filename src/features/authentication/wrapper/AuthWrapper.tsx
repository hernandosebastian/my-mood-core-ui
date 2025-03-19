import { useEffect } from "react";

import { useState } from "react";

import { ReactNode } from "react";
import { useRefreshToken } from "../hooks/use-refresh-token";

export function AuthWrapper({ children }: { children: ReactNode }): ReactNode {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      refreshToken().finally(() => {
        setIsRefreshing(false);
      });
    }
  }, [refreshToken, isRefreshing]);

  return <>{children}</>;
}
