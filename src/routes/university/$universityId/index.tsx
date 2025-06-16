import { fetchUniversityById } from "@/feature/university/data/api";
import { UniversityDetail } from "@/feature/university/university-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/university/$universityId/")({
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
