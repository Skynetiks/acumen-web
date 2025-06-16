import ApplyPage from "@/feature/university/apply";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/university/$universityId/apply/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ApplyPage />;
}
