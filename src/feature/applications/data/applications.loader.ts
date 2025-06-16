import { queryClient } from "@/lib/queryClient";
import { fetchApplications, mockApplications } from "./api";

export async function applicationsLoader() {
  const key = ["applications", { page: 1, filters: {} }];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () =>
        fetchApplications({
          pageParam: 1,
          filters: {},
        }),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
    queryClient.setQueryData(key, mockApplications.slice(0, 10));
  }
  return null;
}
