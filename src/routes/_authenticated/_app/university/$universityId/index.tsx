import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import { fetchUniversityById } from "@/feature/university/data/api";
import { UniversityDetail } from "@/feature/university/university-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_app/university/$universityId/"
)({
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  loader: async ({ params }) => {
    const data = await fetchUniversityById(params.universityId);
    if (!data) {
      throw new Error("University not found");
    }

    return { university: data };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { university } = Route.useLoaderData();
  return <UniversityDetail university={university} />;
}
