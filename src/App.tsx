import { Routes } from "react-router-dom";
import { RoutesList } from "./config/routes";
import Layout from "./app/Layout";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { env } from "./config/env";
import { Toaster } from "./components/ui/sonner";
import { AuthWrapper } from "./features/authentication/wrapper";

const queryClient = new QueryClient();

export default function App(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <Layout>
          <Routes>{RoutesList}</Routes>
          {env.app.mode === "development" && <ReactQueryDevtools />}
          <Toaster />
        </Layout>
      </AuthWrapper>
    </QueryClientProvider>
  );
}
