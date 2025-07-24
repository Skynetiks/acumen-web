import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import ApplicationsPage from "@/feature/applications";
import { applicationsLoader } from "@/feature/applications/data/applications.loader";
import { Params } from "@/feature/applications/data/schema";
import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_app/application/")({
  component: Applications,
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  loader: applicationsLoader,
  validateSearch: Params,
});

function Applications() {
  const searchParams = useSearch({ from: Route.id });

  return <ApplicationsPage params={searchParams} />;
}
