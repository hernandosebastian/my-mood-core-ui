import { Routes } from "react-router-dom";
import { RoutesList } from "./config/routes";
import Layout from "./app/Layout";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App(): ReactNode {
  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Routes>{RoutesList}</Routes>
      </QueryClientProvider>
    </Layout>
  );
}
