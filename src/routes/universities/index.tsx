import { UniversityList } from "@/feature/university/university-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/universities/")({
  component: UniversitiesPage,
});
export default function UniversitiesPage() {
  return <UniversityList />;
}
