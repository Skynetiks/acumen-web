import {
  contactPreferencesSchema,
  coursePreferencesSchema,
  documentUploadSchema,
  personalDetailsSchema,
  stayConnectedSchema,
  studyPreferencesSchema,
  whyJapanSchema,
} from "@/components/form-steps/lib/form-schemas";
import { z } from "zod";

// combine all step schemas
export const universityApplicationSchema = z.object({
  personalDetails: personalDetailsSchema,
  studyPreferences: studyPreferencesSchema,
  coursePreferences: coursePreferencesSchema,
  whyJapan: whyJapanSchema,
  contactPreferences: contactPreferencesSchema,
  stayConnected: stayConnectedSchema,
  documentUpload: documentUploadSchema.optional(),
});

export type UniversityApplicationType = z.infer<
  typeof universityApplicationSchema
>;
