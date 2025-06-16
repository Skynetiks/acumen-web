import Dashboard from "@/feature/dashboard";
import { fetchDashboardData } from "@/feature/dashboard/data/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardRouteComponent,
  loader: fetchDashboardData,
});

function DashboardRouteComponent() {
  const dashboardData = Route.useLoaderData();

  return <Dashboard data={dashboardData} />;
}
