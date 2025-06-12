import { z } from "zod";

export const personalDetailsSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.string().min(1, "Gender is required"),
  familyBackground: z.string().min(1, "Family background is required"),
  academicBackground: z.string().min(1, "Academic background is required"),
  languageProficiency: z.string().min(1, "Language proficiency is required"),
});

export const studyPreferencesSchema = z.object({
  preferredLevelOfStudy: z
    .string()
    .min(1, "Preferred level of study is required"),
  preferredYearOfAdmission: z
    .array(z.string())
    .min(1, "Preferred year of admission is required"),
  preferredIntake: z
    .array(z.string())
    .min(1, "At least one intake preference is required"),
});

export const coursePreferencesSchema = z.object({
  coursePreferences: z
    .array(z.string())
    .min(1, "At least one course preference is required"),
});

export const whyJapanSchema = z.object({
  whyJapan: z.array(z.string()).min(1, "Please select at least one reason"),
});

export const contactPreferencesSchema = z.object({
  contactTime: z
    .array(z.string())
    .min(1, "Please select at least one time preference"),
  contactMethod: z
    .array(z.string())
    .min(1, "Please select at least one contact method"),
});

export const stayConnectedSchema = z.object({
  hearAboutUs: z
    .array(z.string())
    .min(1, "Please select how you heard about us"),
});

export const documentUploadSchema = z.object({
  documents: z.array(z.string()).optional(),
});

export type PersonalDetailsData = z.infer<typeof personalDetailsSchema>;
export type StudyPreferencesData = z.infer<typeof studyPreferencesSchema>;
export type CoursePreferencesData = z.infer<typeof coursePreferencesSchema>;
export type WhyJapanData = z.infer<typeof whyJapanSchema>;
export type ContactPreferencesData = z.infer<typeof contactPreferencesSchema>;
export type StayConnectedData = z.infer<typeof stayConnectedSchema>;
export type DocumentUploadData = z.infer<typeof documentUploadSchema>;
