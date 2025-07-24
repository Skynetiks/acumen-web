import { notificationsSchema, type NotificationDataType } from "./schema";

export const mockNotifications = [
  {
    id: "1",
    type: "event",
    title: "New Events Available",
    message: "10 new events were added in your selected location: New Delhi.",
    timestamp: new Date().toISOString(),
    url: "/events?location=New%20Delhi",
    image: "/",
  },
  {
    id: "2",
    type: "university",
    title: "University List Updated",
    message: "We've refreshed the university list with the latest 2025 data.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
    image: "/",
    url: "/universities",
  },
  {
    id: "3",
    type: "search",
    title: "Search Filter Applied",
    message: "Filters for 'offline events in New Delhi' have been applied.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hr ago
    image: "/",
    url: "/events?eventType=offline&location=New%20Delhi",
  },
  {
    id: "4",
    type: "pagination",
    title: "End of Results",
    message:
      "You've reached the end of the current results. Try refining your filters.",
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    image: "/",
    url: "/events",
  },
  {
    id: "5",
    type: "navigation",
    title: "Event Details Viewed",
    message: "You viewed the details for 'Tech Conference 2025'.",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    image: "/",
    url: "/events/tech-conference-2025",
  },
];

export async function fetchNotifications({
  pageParam = 1,
  pageSize = 10,
}: {
  pageParam?: number;
  pageSize?: number;
  filters?: {};
}): Promise<NotificationDataType[]> {
  const result = notificationsSchema.parse(mockNotifications);
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;

  return result.slice(start, end);
}
