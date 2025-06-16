import { ApplicationDetail } from "@/feature/applications/component/application-detail";
import { fetchUniversityById } from "@/feature/university/data/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/application/$applicationId")({
  component: ApplicationDetailPage,
  loader: async ({ params }) => {
    const data = await fetchUniversityById(params.applicationId);
    if (!data) {
      throw new Error("University not found");
    }

    return { university: data };
  },
});

export default function ApplicationDetailPage() {
  const { university } = Route.useLoaderData();
  return <ApplicationDetail university={university} />;
}
