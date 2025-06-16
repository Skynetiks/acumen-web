import NotificationsPanel from "@/feature/notification";
import { notificationsLoader } from "@/feature/notification/data/notification.loader";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/notification/")({
  component: RouteComponent,
  loader: notificationsLoader,
});

function RouteComponent() {
  return <NotificationsPanel />;
}
