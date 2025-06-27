import { queryClient } from "@/lib/queryClient";
import fetchUserData from "./data/api";

export async function applyUserDataLoader(userId: string) {
  const key = ["userData"];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () => fetchUserData(userId),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
  }
  return null;
}
