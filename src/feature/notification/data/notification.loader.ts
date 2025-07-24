import { queryClient } from "@/lib/queryClient";
import { fetchNotifications } from "./api";

export async function notificationsLoader() {
  const key = ["notifications"];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () => fetchNotifications,
    });
  } catch (error) {
    console.error(error);
  }
  return null;
}
