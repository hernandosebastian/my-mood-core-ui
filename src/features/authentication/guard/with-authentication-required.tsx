import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../hooks";
import { getItem, removeItem, StorageKeys } from "@/services/local-storage";
import { useQueryClient } from "react-query";
import { getMeKeys } from "../hooks/use-get-me";

type WithAuthenticationRequiredOptions = {
  onRedirecting: () => JSX.Element;
};

export const withAuthenticationRequired = (
  Component: ComponentType,
  options: WithAuthenticationRequiredOptions
) => {
  return function WithAuthenticationRequired(): JSX.Element {
    const navigate = useNavigate();
    const { onRedirecting } = options;

    const { data, isLoading } = useGetMe();
    const accessToken = getItem(StorageKeys.COGNITO_ACCESS_TOKEN);
    const queryClient = useQueryClient();

    useEffect(() => {
      if (isLoading || data?.user || accessToken) {
        return;
      }

      navigate("/log-in");
      removeItem(StorageKeys.COGNITO_ACCESS_TOKEN);
      queryClient.removeQueries(getMeKeys());
    }, [isLoading, data, accessToken, queryClient, navigate]);

    return data?.user && accessToken ? <Component /> : onRedirecting();
  };
};

