import { queryClient } from "@/lib/queryClient";
import fetchUserData from "./data/api";

export async function applyUserDataLoader() {
  const key = ["userData"];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () => fetchUserData(),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
  }
  return null;
}
