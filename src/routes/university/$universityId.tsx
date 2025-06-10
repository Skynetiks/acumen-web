import { UniversityDetail } from "@/feature/university/university-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/university/$universityId")({
  component: UniversityDetailPage,
  loader: async ({ params }) => {
    return { universityId: params.universityId };
  },
});

export default function UniversityDetailPage() {
  const { universityId } = Route.useParams();
  return <UniversityDetail universityId={universityId} />;
}
