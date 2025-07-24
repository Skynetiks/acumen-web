import { queryClient } from "@/lib/queryClient";
import { fetchEvents, getEventPriceDistribution, mockEvents } from "./api";
import { EventFiltersQueryKey, EventQueryKey } from "./constants";

export async function eventsLoader() {
  try {
    await queryClient.ensureQueryData({
      queryKey: EventFiltersQueryKey,
      queryFn: () => getEventPriceDistribution(),
    });
    await queryClient.ensureQueryData({
      queryKey: EventQueryKey,
      queryFn: () =>
        fetchEvents({
          pageParam: 1,
          filters: {},
        }),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
    queryClient.setQueryData(EventQueryKey, mockEvents.slice(0, 10));
  }
  return null;
}
