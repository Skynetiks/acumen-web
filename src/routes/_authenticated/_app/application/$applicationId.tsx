import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import { ApplicationDetail } from "@/feature/applications/component/application-detail";
import { fetchUniversityById } from "@/feature/university/data/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_app/application/$applicationId"
)({
  component: ApplicationDetailPage,
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  loader: async ({ params }) => {
    const data = await fetchUniversityById(params.applicationId);
    if (!data) {
      throw new Error("University not found");
    }

    return { university: data };
  },
});

function ApplicationDetailPage() {
  const { university } = Route.useLoaderData();
  return <ApplicationDetail university={university} />;
}
