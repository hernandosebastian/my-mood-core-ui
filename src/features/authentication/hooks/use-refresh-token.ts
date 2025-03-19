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
      console.log("entered to refresh token");
      console.log("values on object log are: ", {
        username: username,
        refreshToken: refreshToken,
        accessToken: accessToken,
      });

      if (!username || !refreshToken) {
        console.log("username or refreshToken is empty");
        handleSessionExpired();
        throw new Error("Tu sesión expiro, por favor inicia sesión de nuevo");
      }

      const shouldRefreshToken = !accessToken;
      console.log("shouldRefreshToken: ", shouldRefreshToken);

      if (shouldRefreshToken) {
        console.log("entered to should refresh token");
        const response = await refreshTokenService({
          username,
          refreshToken,
        });

        console.log("response from refresh token: ", response);

        setAccessTokenCookie(response.accessToken);
        apiService.setAuthentication(response.accessToken);
        getMeQuery.refetch();
      }
    } catch (error) {
      console.log("error on refresh token: ", error);
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
