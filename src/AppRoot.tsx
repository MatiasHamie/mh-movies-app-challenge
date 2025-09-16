"use client";

import { Outlet } from "react-router";

import QueryProvider from "./providers/QueryProvider.client";
import { Layout } from "./shared/layouts/Layout";

export default function AppRoot() {
  return (
    <QueryProvider>
      <Layout>
        <Outlet />
      </Layout>
    </QueryProvider>
  );
}
