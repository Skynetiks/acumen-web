import { FormRenderer } from "@/components/form-builder/form-renderer";
import { onboardingConfig } from "./configs/form/onboarding.config";

function OnboardingForm() {
  // Extract initial data from URL params or API
  const initialData = {};

  return <FormRenderer config={onboardingConfig} initialData={initialData} />;
}

export default OnboardingForm;
