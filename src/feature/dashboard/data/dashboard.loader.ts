import { queryClient } from "@/lib/queryClient";
import { fetchDashboardData } from "./api";

export async function universitiesLoader() {
  const key = ["dashboard"];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () => fetchDashboardData(),
    });
  } catch (error) {}
  console.log(queryClient.getQueriesData({ queryKey: key }));
  return null;
}
