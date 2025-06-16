import type { Event, EventParamsType } from "./schema";

export const mockEvents: Event[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Event Title ${i + 1}`,
  date: "2025-06-20",
  time: "5:30 PM",
  location: "Bangalore",
  image: "/placeholder.svg?height=80&width=80",
}));

export async function fetchEvents({
  pageParam = 1,
  pageSize = 10,
  filters,
}: {
  pageParam?: number;
  pageSize?: number;
  filters?: EventParamsType | {};
}): Promise<Event[]> {
  const all = mockEvents;

  let filtered = [...all];

  // Filter: Search
  if (filters && "search" in filters && filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(search) ||
        event.location.toLowerCase().includes(search) ||
        event.date.toLowerCase().includes(search)
    );
  }

  // Filter: Location
  if (
    filters &&
    "location" in filters &&
    filters.location &&
    filters.location !== "All"
  ) {
    filtered = filtered.filter((event) =>
      event.location
        .toLowerCase()
        .includes(filters.location?.toLowerCase() || "")
    );
  }

  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;

  return filtered.slice(start, end);
}

export async function fetchEventById(eventId: string) {
  return mockEvents.find((e) => String(e.id) === eventId);
}
