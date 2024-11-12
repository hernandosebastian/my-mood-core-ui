import { useQueryClient } from "react-query";
import { removeItem, StorageKeys } from "@/services/local-storage";
import { getMeKeys } from "./use-get-me";

export const useLogOut = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    removeItem(StorageKeys.COGNITO_ACCESS_TOKEN);

    queryClient.invalidateQueries(getMeKeys());
    queryClient.removeQueries(getMeKeys());
  };
};

