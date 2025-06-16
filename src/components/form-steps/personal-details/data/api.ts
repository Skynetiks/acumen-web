import {
  personalDetailsFormSchema,
  type PersonalDetailsFormData,
} from "../../lib/form-schemas";

const nationalityOptions = [
  { value: "indian", label: "Indian" },
  { value: "american", label: "American" },
  { value: "british", label: "British" },
  { value: "canadian", label: "Canadian" },
  { value: "australian", label: "Australian" },
  { value: "other", label: "Other" },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

const familyBackgroundOptions = [
  { value: "business", label: "Business" },
  { value: "government", label: "Government Service" },
  { value: "private-sector", label: "Private Sector" },
  { value: "agriculture", label: "Agriculture" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "other", label: "Other" },
];

const academicBackgroundOptions = [
  { value: "high-school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's Degree" },
  { value: "masters", label: "Master's Degree" },
  { value: "phd", label: "PhD" },
];

const languageProficiencyOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "native", label: "Native" },
  { value: "ielts", label: "IELTS Certified" },
  { value: "toefl", label: "TOEFL Certified" },
];

export async function fetchPersonalDetails(): Promise<PersonalDetailsFormData> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 500));

  // Example default data, you can customize based on your app
  const res = {
    nationality: nationalityOptions,
    gender: genderOptions,
    familyBackground: familyBackgroundOptions,
    academicBackground: academicBackgroundOptions,
    languageProficiency: languageProficiencyOptions,
  };

  // Validate with Zod schema
  const data = personalDetailsFormSchema.safeParse(res);
  if (data.error) throw new Error("Failed to parse" + data.error);
  return data.data;
}
