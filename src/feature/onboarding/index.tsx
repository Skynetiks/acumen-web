import { FormRenderer } from "@/components/form-builder/form-renderer";
import { onboardingConfig } from "./configs/onboarding.config";

function OnboardingForm() {
  return <FormRenderer config={onboardingConfig} />;
}

export default OnboardingForm;
