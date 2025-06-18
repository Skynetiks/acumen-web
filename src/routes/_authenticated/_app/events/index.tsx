// routes/events.tsx
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { eventParams } from "@/feature/events/data/schema";
import { eventsLoader } from "@/feature/events/data/events.loader";
import { EventsPage } from "@/feature/events";
import { LoadingScreen } from "@/components/ui/loading-component";
import { ErrorComponent } from "@/components/ui/error-component";

export const Route = createFileRoute("/_authenticated/_app/events/")({
  component: Events,
  loader: eventsLoader,
  validateSearch: eventParams,
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
});

function Events() {
  const searchParams = useSearch({ from: Route.id });

  return <EventsPage params={searchParams} />;
}
