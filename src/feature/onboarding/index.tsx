import { FormRenderer } from "@/components/form-builder/form-renderer";
import { onboardingConfig } from "./configs/onboarding.config";

function OnboardingForm() {
  return (
    <FormRenderer
      config={onboardingConfig}
      className="md:h-[80%] md:max-w-[60%] md:self-center md:shadow-lg"
    />
  );
}

export default OnboardingForm;
