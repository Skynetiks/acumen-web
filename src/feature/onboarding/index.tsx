import { FormRenderer } from "@/components/form-builder/form-renderer";
import { onboardingConfig } from "./configs/onboarding.config";

function OnboardingForm() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <FormRenderer
        config={onboardingConfig}
        className="md:h-[80%] md:max-w-[60%] md:self-center  md:shadow-lg"
      />
    </div>
  );
}

export default OnboardingForm;
