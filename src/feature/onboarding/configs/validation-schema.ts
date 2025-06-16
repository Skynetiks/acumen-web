import {
  contactPreferencesSchema,
  coursePreferencesSchema,
  personalDetailsSchema,
  stayConnectedSchema,
  studyPreferencesSchema,
  whyJapanSchema,
} from "@/components/form-steps/lib/form-schemas";
import { z } from "zod";

// combine all step schemas
export const onboardingApplicationSchema = z.object({
  personalDetails: personalDetailsSchema,
  studyPreferences: studyPreferencesSchema,
  coursePreferences: coursePreferencesSchema,
  whyJapan: whyJapanSchema,
  contactPreferences: contactPreferencesSchema,
  stayConnected: stayConnectedSchema,
});

export type UniversityApplicationType = z.infer<
  typeof onboardingApplicationSchema
>;
