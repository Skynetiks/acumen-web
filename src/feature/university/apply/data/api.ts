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

export const sampleUserData = {
  personalDetails: {
    dateOfBirth: "1998-05-12",
    nationality: "Indian",
    gender: "Male",
    familyBackground: "My parents are supportive of my studies abroad.",
    academicBackground:
      "Completed Bachelor's in Computer Science from IIT Delhi.",
    languageProficiency: "IELTS Band 7.5, intermediate Japanese (N4)",
  },

  studyPreferences: {
    preferredLevelOfStudy: "Master's",
    preferredYearOfAdmission: ["2025", "2026"],
    preferredIntake: ["April", "September"],
  },

  coursePreferences: {
    coursePreferences: [
      "Computer Science",
      "Artificial Intelligence",
      "Robotics",
    ],
  },

  whyJapan: {
    whyJapan: [
      "High-quality education",
      "Cultural interest",
      "Cutting-edge research in robotics",
    ],
  },

  contactPreferences: {
    contactTime: ["Morning", "Evening"],
    contactMethod: ["Email", "WhatsApp"],
  },

  stayConnected: {
    hearAboutUs: ["Google Search", "Friend Recommendation"],
  },

  documentUpload: {
    documents: [
      {
        id: "doc-1",
        name: "Transcript.pdf",
        format: "pdf",
        size: "1.2MB",
        status: "uploaded",
      },
      {
        id: "doc-2",
        name: "Passport.jpg",
        format: "jpg",
        size: "400KB",
        status: "uploaded",
      },
    ],
  },
};

export default function getUserData() {
  const data = userSchema.parse(sampleUserData);
  return data;
}
