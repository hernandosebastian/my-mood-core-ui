import { Routes } from "react-router-dom";
import { RoutesList } from "./config/routes";
import Layout from "./app/Layout";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { env } from "./config/env";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { useRefreshToken } from "./features/authentication/hooks/use-refresh-token";

const queryClient = new QueryClient();

export default function App(): ReactNode {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const refreshToken = useRefreshToken();

  useEffect(() => {
    if (!isRefreshing) {
      setIsRefreshing(true);
      refreshToken().finally(() => {
        setIsRefreshing(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>{RoutesList}</Routes>
        {env.app.mode === "development" && <ReactQueryDevtools />}
        <Toaster />
      </Layout>
    </QueryClientProvider>
  );
}
