import EventDetails from "@/feature/events/components/event-details";
import { fetchEventById } from "@/feature/events/data/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/events/$eventId")({
  component: EventDetailsPage,

  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error...</div>,
  loader: async ({ params }) => await fetchEventById(params.eventId),
});

function EventDetailsPage() {
  const event = Route.useLoaderData();
  const { eventId } = Route.useParams();

  return <EventDetails event={event} eventId={eventId} />;
}
