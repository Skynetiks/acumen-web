import { queryClient } from "@/lib/queryClient";
import {
  fetchUniversities,
  fetchUniversityById,
  mockUniversities,
} from "./api";

export async function universitiesLoader() {
  const key = ["universities", { page: 1, filters: {} }];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () =>
        fetchUniversities({
          pageParam: 1,
          filters: {},
        }),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
    queryClient.setQueryData(key, mockUniversities.slice(0, 10));
  }
  return null;
}

export async function universityByIdLoader(universityId: string) {
  const key = ["university", universityId];
  try {
    await queryClient.ensureQueryData({
      queryKey: key,
      queryFn: () => fetchUniversityById(universityId),
    });
  } catch (error) {
    console.warn("Fetch failed, using mock data fallback", error);
    queryClient.setQueryData(key, mockUniversities[0]);
  }
  return null;
}
