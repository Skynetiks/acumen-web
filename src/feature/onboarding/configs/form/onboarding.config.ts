import type { FormConfig } from "@/types/form.types";

import {
  personalDetailsSchema,
  studyPreferencesSchema,
  coursePreferencesSchema,
  whyJapanSchema,
  contactPreferencesSchema,
  stayConnectedSchema,
} from "../../lib/form-schemas";
import { PersonalDetailsStep } from "../../components/form-steps/personal-details-step";
import { StudyPreferencesStep } from "../../components/form-steps/study-preferences-step";
import { CoursePreferencesStep } from "../../components/form-steps/course-preferences-step";
import { WhyJapanStep } from "../../components/form-steps/why-japan-step";
import { ContactPreferencesStep } from "../../components/form-steps/contact-preferences-step";
import { StayConnectedStep } from "../../components/form-steps/stay-connected-step";
import { FormSuccess } from "../../components/form-steps/form-success";

export const onboardingConfig: FormConfig = {
  id: "onboarding",
  title: "Onboarding",
  persistData: true,
  showProgress: true,
  allowSkip: false,
  successComponent: FormSuccess,
  steps: [
    {
      id: "personalDetails",
      title: "Hello, User !",
      subtitle: "Ready to kick start your Study Journey in Japan?",
      component: PersonalDetailsStep,
      schema: personalDetailsSchema,
      showBackButton: false,
      buttonText: "Proceed to Next",
    },
    {
      id: "studyPreferences",
      title: "Study Preferences",
      subtitle: "Tell us what, when, and how you'd like to begin your journey",
      component: StudyPreferencesStep,
      schema: studyPreferencesSchema,
      buttonText: "Proceed to Next",
    },
    {
      id: "coursePreferences",
      title: "Your Course preference",
      subtitle: "Tell us what you'd love to study in Japan",
      component: CoursePreferencesStep,
      schema: coursePreferencesSchema,
      buttonText: "Proceed to Next",
    },
    {
      id: "whyJapan",
      title: "Why Japan?",
      subtitle: "Share what draws you to Japan for your education",
      component: WhyJapanStep,
      schema: whyJapanSchema,
      buttonText: "Proceed to Next",
    },
    {
      id: "contactPreferences",
      title: "Contact Preferences",
      subtitle: "Let us know the best time and way to reach you",
      component: ContactPreferencesStep,
      schema: contactPreferencesSchema,
      buttonText: "Proceed to Next",
    },
    {
      id: "stayConnected",
      title: "Stay Connected",
      subtitle: "It's a one time set up, just 1 min, promise",
      component: StayConnectedStep,
      schema: stayConnectedSchema,
      buttonText: "Submit",
    },
  ],
  onComplete: async (data) => {
    console.log("Onboarding completed:", data);
    // API call to submit data
    await new Promise((resolve) => setTimeout(resolve, 2000));
  },
  onStepChange: (currentStep, totalSteps) => {
    console.log(`Step ${currentStep} of ${totalSteps}`);
    // Analytics tracking
  },
};
