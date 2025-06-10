import PageWrapper from "@/components/page-wrapper";
import { CollegeFinderLanding } from "@/feature/college-finder/college-finder-landing";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/college-finder/")({
  component: CollegeFinderPage,
});
export default function CollegeFinderPage() {
  return (
    <PageWrapper title="Find Universities">
      <CollegeFinderLanding />
    </PageWrapper>
  );
}
