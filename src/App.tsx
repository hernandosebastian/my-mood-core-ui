import { Routes } from "react-router-dom";
import { RoutesList } from "./config/routes";
import Layout from "./app/Layout";

export default function App(): JSX.Element {
  return (
    <Layout>
      <Routes>{RoutesList}</Routes>
    </Layout>
  );
}
