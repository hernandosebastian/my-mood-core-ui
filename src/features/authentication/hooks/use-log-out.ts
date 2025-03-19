import { useQueryClient } from "react-query";
import { removeAllCookies } from "@/services/cookies";

export const useLogOut = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    removeAllCookies();
    queryClient.clear();
  };
};

