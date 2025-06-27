import { mockApplications } from "@/feature/applications/data/api";
import { mockUniversities } from "@/feature/university/data/api";
import { DashboardData } from "./schema";
import { mockEvents } from "@/feature/events/data/api";

export async function fetchDashboardData() {
  const universities = mockUniversities.slice(0, 2);
  const applications = mockApplications.slice(0, 2);
  const events = mockEvents.slice(0, 2);
  const result = DashboardData.parse({ universities, applications, events });
  return result;
}
