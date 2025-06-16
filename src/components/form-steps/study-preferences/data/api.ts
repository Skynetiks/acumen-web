import {
  studyPreferencesFormSchema,
  type StudyPreferencesFormData,
} from "../../lib/form-schemas";

export const preferredLevelOfStudyOptions = [
  { value: "undergraduate", label: "Undergraduate (Bachelor's)" },
  { value: "graduate", label: "Graduate (Master's)" },
  { value: "postgraduate", label: "Postgraduate (Advanced Master's)" },
  { value: "phd", label: "PhD (Doctoral)" },
  { value: "certificate", label: "Certificate Program" },
  { value: "language", label: "Language Course" },
] as const;

export const intakeOptions = [
  { value: "spring", label: "Spring (Jan - April)" },
  { value: "summer", label: "Summer (May - August)" },
  { value: "fall", label: "Fall (Aug - November)" },
  { value: "winter", label: "Winter (Dec - February)" },
] as const;

export const yearOptions = [
  { value: "2025", label: "Beginning" },
  { value: "2026", label: "Beginning" },
  { value: "2027", label: "Beginning" },
] as const;

const mockStudyPreferencesData = {
  preferredLevelOfStudyOptions,
  intakeOptions,
  yearOptions,
};

export async function fetchStudyPreferencesData(): Promise<StudyPreferencesFormData> {
  console.log("here");
  const result = studyPreferencesFormSchema.safeParse(mockStudyPreferencesData);
  if (!result.success) {
    console.error(result.error.format());
    throw new Error("Invalid study preferences data");
  }
  return result.data;
}
