import { ContactPreferencesStep } from "@/components/form-steps/contact-preferences";
import { CoursePreferencesStep } from "@/components/form-steps/course-preferences";
import { DocumentUploadStep } from "@/components/form-steps/document-uploading";
import { PersonalDetailsStep } from "@/components/form-steps/personal-details";
import { StayConnectedStep } from "@/components/form-steps/stay-connected";
import { StudyPreferencesStep } from "@/components/form-steps/study-preferences";
import { WhyJapanStep } from "@/components/form-steps/why-japan";
import {
  contactPreferencesSchema,
  coursePreferencesSchema,
  documentUploadSchema,
  personalDetailsSchema,
  stayConnectedSchema,
  studyPreferencesSchema,
  whyJapanSchema,
} from "@/components/form-steps/lib/form-schemas";
import type { FormConfig } from "@/types/form.types";
import { ApplicationSuccessStep } from "../components/application-success";
import { fetchStudyPreferencesData } from "@/components/form-steps/study-preferences/data/api";
import { fetchCoursePreferences } from "@/components/form-steps/course-preferences/data/api";
import { fetchWhyJapanReasonOptions } from "@/components/form-steps/why-japan/data/api";
import { fetchContactPreferences } from "@/components/form-steps/contact-preferences/data/api";
import { fetchStayConnectedData } from "@/components/form-steps/stay-connected/data/api";
import { universityApplicationSchema } from "./validation-schema";
import { fetchUploadedDocumentData } from "@/components/form-steps/document-uploading/data/api";

export function getUniversityApplicationConfig(
  universityId: string
): FormConfig {
  return {
    id: `university-application-${universityId}`,
    title: "University Application",
    persistData: true,
    showProgress: true,
    allowSkip: false,
    successComponent: ApplicationSuccessStep,
    validationSchema: universityApplicationSchema,
    steps: [
      {
        id: "personalDetails",
        title: "Hello, User !",
        subtitle: "Ready to kick start your Study Journey in Japan?",
        component: PersonalDetailsStep,
        schema: personalDetailsSchema,
        showBackButton: false,
        buttonText: "Proceed to Next",
        prefetchData: false,
      },
      {
        id: "studyPreferences",
        title: "Study Preferences",
        subtitle:
          "Tell us what, when, and how you'd like to begin your journey",
        component: StudyPreferencesStep,
        schema: studyPreferencesSchema,
        buttonText: "Proceed to Next",
        prefetchData: true,
        queryFn: fetchStudyPreferencesData,
      },
      {
        id: "coursePreferences",
        title: "Your Course preference",
        subtitle: "Tell us what you'd love to study in Japan",
        component: CoursePreferencesStep,
        schema: coursePreferencesSchema,
        buttonText: "Proceed to Next",
        prefetchData: true,
        queryFn: fetchCoursePreferences,
      },
      {
        id: "whyJapan",
        title: "Why Japan?",
        subtitle: "Share what draws you to Japan for your education",
        component: WhyJapanStep,
        schema: whyJapanSchema,
        buttonText: "Proceed to Next",
        prefetchData: true,
        queryFn: fetchWhyJapanReasonOptions,
      },
      {
        id: "contactPreferences",
        title: "Contact Preferences",
        subtitle: "Let us know the best time and way to reach you",
        component: ContactPreferencesStep,
        schema: contactPreferencesSchema,
        buttonText: "Proceed to Next",
        prefetchData: true,
        queryFn: fetchContactPreferences,
      },
      {
        id: "stayConnected",
        title: "Stay Connected",
        subtitle: "It's a one time set up, just 1 min, promise",
        component: StayConnectedStep,
        schema: stayConnectedSchema,
        buttonText: "Submit",
        prefetchData: true,
        queryFn: fetchStayConnectedData,
      },
      {
        id: "documentUpload",
        title: "Review Documents",
        subtitle: "Review and update your documents for this application",
        component: DocumentUploadStep,
        schema: documentUploadSchema,
        showBackButton: true,
        prefetchData: true,
        queryFn: fetchUploadedDocumentData,
        buttonText: "Submit",
      },
    ],
    onComplete: async (data) => {
      console.log("College application completed:", universityId, data);
      // Submit application to specific university
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
    onStepChange: (currentStep, totalSteps) => {
      console.log(`Application Step ${currentStep} of ${totalSteps}`);
    },
  };
}
