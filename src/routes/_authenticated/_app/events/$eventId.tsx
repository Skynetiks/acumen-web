import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import EventDetails from "@/feature/events/components/event-details";
import { fetchEventById } from "@/feature/events/data/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_app/events/$eventId")({
  component: EventDetailsPage,
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  loader: async ({ params }) => await fetchEventById(params.eventId),
});

function EventDetailsPage() {
  const event = Route.useLoaderData();
  const { eventId } = Route.useParams();

  return <EventDetails event={event} eventId={eventId} />;
}
