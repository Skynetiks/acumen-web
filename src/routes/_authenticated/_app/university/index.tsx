import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import { universityParams } from "@/feature/university/data/schema";
import { universitiesLoader } from "@/feature/university/data/university.loader";
import { UniversityList } from "@/feature/university/university-list";
import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_app/university/")({
  component: University,
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  loader: universitiesLoader,
  validateSearch: universityParams,
});

function University() {
  const searchParams = useSearch({ from: Route.id });
  return <UniversityList params={searchParams} />;
}
