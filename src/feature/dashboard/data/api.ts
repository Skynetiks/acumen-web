import { mockApplications } from "@/feature/applications/data/api";
import { mockUniversities } from "@/feature/university/data/api";
import { DashboardData } from "./schema";

export async function fetchDashboardData() {
  const universities = mockUniversities.slice(0, 2);
  const applications = mockApplications.slice(0, 2);
  const result = DashboardData.parse({ universities, applications });
  return result;
}
