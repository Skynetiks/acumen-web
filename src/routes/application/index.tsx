import ApplicationsPage from "@/feature/applications";
import { applicationsLoader } from "@/feature/applications/data/applications.loader";
import { Params } from "@/feature/applications/data/schema";
import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/application/")({
  component: Applications,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error...</div>,
  loader: applicationsLoader,
  validateSearch: Params,
});

function Applications() {
  const searchParams = useSearch({ from: Route.id });

  return <ApplicationsPage params={searchParams} />;
}
