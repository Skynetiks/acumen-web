import { universityParams } from "@/feature/university/data/schema";
import { universitiesLoader } from "@/feature/university/data/university.loader";
import { UniversityList } from "@/feature/university/university-list";
import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/university/")({
  component: UniversitiesPage,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error...</div>,
  loader: universitiesLoader,
  validateSearch: universityParams,
});

export default function UniversitiesPage() {
  const searchParams = useSearch({ from: Route.id });

  return <UniversityList params={searchParams} />;
}
