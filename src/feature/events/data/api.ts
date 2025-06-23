import type { EventParamsType, EventType } from "./schema";
const images = ["/assets/dashboard/event1.png", "/assets/dashboard/event2.png"];

export const mockEvents: EventType[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  title: `Your career starts here`,
  date: new Date().toISOString(),
  location: "Bangalore",
  image: images[i % 2],
}));

import { addDays, startOfWeek, endOfWeek } from "date-fns";

export function parseTimeDateFilter(value: string): {
  start: Date;
  end?: Date;
} {
  const today = new Date();

  switch (value) {
    case "today":
      return { start: today };
    case "tomorrow":
      return { start: addDays(today, 1) };
    case "this-week":
      return {
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      };
    default:
      try {
        return { start: new Date(value) };
      } catch {
        return { start: today };
      }
  }
}

export async function fetchEvents({
  pageParam = 1,
  pageSize = 10,
  filters,
}: {
  pageParam?: number;
  pageSize?: number;
  filters?: EventParamsType | {};
}): Promise<EventType[]> {
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

  const dateFilterParsed =
    filters &&
    "timeDate" in filters &&
    filters.timeDate &&
    parseTimeDateFilter(filters.timeDate || "");

  if (
    dateFilterParsed &&
    "start" in dateFilterParsed &&
    dateFilterParsed.start &&
    dateFilterParsed.start instanceof Date
  ) {
    const { start, end } = dateFilterParsed;
    filtered = filtered.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= start && (!end || eventDate <= end);
    });
  }

  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;

  return filtered.slice(start, end);
}

export async function fetchEventById(eventId: string) {
  return mockEvents.find((e) => String(e.id) === eventId);
}
