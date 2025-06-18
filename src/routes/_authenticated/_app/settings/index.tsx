import Settings from "@/feature/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_app/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Settings />;
}
