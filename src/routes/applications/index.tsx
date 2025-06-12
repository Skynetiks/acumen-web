import ApplicationsPage from "@/feature/applications";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/applications/")({
  component: Applications,
});

function Applications() {
  return <ApplicationsPage />;
}
