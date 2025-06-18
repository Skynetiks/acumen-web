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

export const userSchema = z.object({
  personalDetails: personalDetailsSchema,
  studyPreferences: studyPreferencesSchema,
  coursePreferences: coursePreferencesSchema,
  whyJapan: whyJapanSchema,
  contactPreferences: contactPreferencesSchema,
  stayConnected: stayConnectedSchema,
  documentUpload: documentUploadSchema,
});

export default function fetchUserData() {
  const stored: any = localStorage.getItem("form-storage-onboarding");
  console.log(stored.formData);
  if (!stored.formData) return null;
  return stored.formData;
}
