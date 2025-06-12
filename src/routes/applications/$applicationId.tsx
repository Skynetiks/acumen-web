import { UniversityDetail } from "@/feature/university/university-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/applications/$applicationId")({
  component: ApplicationDetailPage,
  loader: async ({ params }) => {
    return { applicationId: params.applicationId };
  },
});

export default function ApplicationDetailPage() {
  const { applicationId } = Route.useParams();
  return <UniversityDetail universityId={applicationId} />;
}
