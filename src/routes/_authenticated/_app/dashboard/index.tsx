import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import Dashboard from "@/feature/dashboard";
import { fetchDashboardData } from "@/feature/dashboard/data/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_app/dashboard/")({
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  component: DashboardRouteComponent,
  loader: fetchDashboardData,
});

function DashboardRouteComponent() {
  const dashboardData = Route.useLoaderData();

  return <Dashboard data={dashboardData} />;
}
