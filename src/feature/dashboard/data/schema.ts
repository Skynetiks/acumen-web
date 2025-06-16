import { applicationsSchema } from "@/feature/applications/data/schema";
import { UniversitiesSchema } from "@/feature/university/data/schema";
import { z } from "zod";

export const DashboardData = z.object({
  universities: UniversitiesSchema,
  applications: applicationsSchema,
});

export type DashboardDataType = z.infer<typeof DashboardData>;
