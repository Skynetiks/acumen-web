import { queryClient } from "@/lib/queryClient";
import { fetchEvents, mockEvents } from "./api";

export async function eventsLoader() {
  const key = ["events", { page: 1, filters: {} }];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () =>
        fetchEvents({
          pageParam: 1,
          filters: {},
        }),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
    queryClient.setQueryData(key, mockEvents.slice(0, 10));
  }
  return null;
}
