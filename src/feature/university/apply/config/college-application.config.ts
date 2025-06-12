import { ContactPreferencesStep } from "@/feature/onboarding/components/form-steps/contact-preferences-step";
import { CoursePreferencesStep } from "@/feature/onboarding/components/form-steps/course-preferences-step";
import { DocumentUploadStep } from "@/feature/onboarding/components/form-steps/document-uploading-step";
import { PersonalDetailsStep } from "@/feature/onboarding/components/form-steps/personal-details-step";
import { StayConnectedStep } from "@/feature/onboarding/components/form-steps/stay-connected-step";
import { StudyPreferencesStep } from "@/feature/onboarding/components/form-steps/study-preferences-step";
import { WhyJapanStep } from "@/feature/onboarding/components/form-steps/why-japan-step";
import {
  contactPreferencesSchema,
  coursePreferencesSchema,
  documentUploadSchema,
  personalDetailsSchema,
  stayConnectedSchema,
  studyPreferencesSchema,
  whyJapanSchema,
} from "@/feature/onboarding/lib/form-schemas";
import type { FormConfig } from "@/types/form.types";
import { ApplicationSuccessStep } from "../components/application-success";

export const collegeApplicationConfig: FormConfig = {
  id: "college-application",
  title: "College Application",
  persistData: true,
  showProgress: true,
  allowSkip: false,
  successComponent: ApplicationSuccessStep,
  steps: [
    {
      id: "personalDetails",
      title: "Personal Details",
      subtitle: "Review and update your personal information",
      component: PersonalDetailsStep,
      schema: personalDetailsSchema,
      showBackButton: false,
    },
    {
      id: "studyPreferences",
      title: "Study Preferences",
      subtitle: "Review your study preferences for this application",
      component: StudyPreferencesStep,
      schema: studyPreferencesSchema,
    },
    {
      id: "coursePreferences",
      title: "Course Preferences",
      subtitle: "Confirm your course preferences",
      component: CoursePreferencesStep,
      schema: coursePreferencesSchema,
    },
    {
      id: "whyJapan",
      title: "Why Japan?",
      subtitle: "Review your reasons for studying in Japan",
      component: WhyJapanStep,
      schema: whyJapanSchema,
    },
    {
      id: "contactPreferences",
      title: "Contact Preferences",
      subtitle: "Confirm your contact preferences",
      component: ContactPreferencesStep,
      schema: contactPreferencesSchema,
    },
    {
      id: "stayConnected",
      title: "Stay Connected",
      subtitle: "Review how you heard about us",
      component: StayConnectedStep,
      schema: stayConnectedSchema,
    },
    {
      id: "documentUpload",
      title: "Review Documents",
      subtitle: "Review and update your documents for this application",
      component: DocumentUploadStep,
      schema: documentUploadSchema,
      showBackButton: true,
    },
  ],
  onComplete: async (data) => {
    console.log("College application completed:", data);
    // Submit application to specific university
    await new Promise((resolve) => setTimeout(resolve, 2000));
  },
  onStepChange: (currentStep, totalSteps) => {
    console.log(`Application Step ${currentStep} of ${totalSteps}`);
  },
};
