// routes/events.tsx
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { eventParams } from "@/feature/events/data/schema";
import { eventsLoader } from "@/feature/events/data/events.loader";
import { EventsPage } from "@/feature/events";

export const Route = createFileRoute("/events/")({
  component: Events,
  loader: eventsLoader,
  validateSearch: eventParams,
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Something went wrong.</div>,
});

function Events() {
  const searchParams = useSearch({ from: Route.id });

  return <EventsPage params={searchParams} />;
}
