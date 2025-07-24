import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import NotificationsPanel from "@/feature/notification";
import { notificationsLoader } from "@/feature/notification/data/notification.loader";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_authenticated/_app/notification/")({
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  component: RouteComponent,
  loader: notificationsLoader,
});

function RouteComponent() {
  return <NotificationsPanel />;
}
