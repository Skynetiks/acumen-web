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
import type { UniversityApplicationType } from "../config/validation-schema";

export const userSchema = z.object({
  personalDetails: personalDetailsSchema,
  studyPreferences: studyPreferencesSchema,
  coursePreferences: coursePreferencesSchema,
  whyJapan: whyJapanSchema,
  contactPreferences: contactPreferencesSchema,
  stayConnected: stayConnectedSchema,
  documentUpload: documentUploadSchema,
});

export default function fetchUserData(userId: string) {
  const stored = localStorage.getItem(`form-storage-onboarding-${userId}`);
  if (!stored) return null;
  const data = JSON.parse(stored);
  const result: UniversityApplicationType = data.state.formData;
  if (!result) return null;
  return result;
}
