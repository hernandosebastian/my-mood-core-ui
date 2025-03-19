import {
  getCookie,
  removeAllCookies,
  setAccessTokenCookie,
  StoredCookies,
} from "@/services/cookies";
import { refreshToken as refreshTokenService } from "@/features/authentication/services";
import { useToast } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useGetMe } from "./use-get-me";
import { apiService } from "@/config/requests/api-service";

export function useRefreshToken() {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const getMeQuery = useGetMe();

  const handleSessionExpired = (): void => {
    removeAllCookies();
    queryClient.clear();
    navigate("/iniciar-sesion");
  };

  return async function refreshToken(): Promise<void> {
    try {
      const username = getCookie(StoredCookies.USERNAME) || "";
      const accessToken = getCookie(StoredCookies.ACCESS_TOKEN) || "";
      const refreshToken = getCookie(StoredCookies.REFRESH_TOKEN) || "";

      if (!username || !refreshToken) {
        handleSessionExpired();
        throw new Error("Tu sesión expiro, por favor inicia sesión de nuevo");
      }

      const shouldRefreshToken = !accessToken;

      if (shouldRefreshToken) {
        const response = await refreshTokenService({
          username,
          refreshToken,
        });

        setAccessTokenCookie(response.accessToken);
        apiService.setAuthentication(response.accessToken);
        getMeQuery.refetch();
      }
    } catch (error) {
      handleSessionExpired();

      if (error instanceof Error) {
        toast.showErrorToast("Error al actualizar sesión", error.message);
      } else {
        toast.showErrorToast(
          "Error al actualizar sesión",
          "Ocurrió un error inesperado, por favor intenta iniciar sesión de nuevo"
        );
      }
    }
  };
}
