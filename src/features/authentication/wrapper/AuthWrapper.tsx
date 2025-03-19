import { useEffect, useRef } from "react";

import { ReactNode } from "react";
import { useRefreshToken } from "../hooks/use-refresh-token";

export function AuthWrapper({ children }: { children: ReactNode }): ReactNode {
  const refreshToken = useRefreshToken();
  const hasAttemptedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!hasAttemptedRef.current) {
      hasAttemptedRef.current = true;
      refreshToken().catch(() => {
        hasAttemptedRef.current = false;
      });
    }
  }, [refreshToken]);

  return <>{children}</>;
}
