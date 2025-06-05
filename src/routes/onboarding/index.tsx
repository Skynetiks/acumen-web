import OnboardingForm from "@/feature/onboarding";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding/")({
  component: Onboarding,
});

function Onboarding() {
  return <OnboardingForm />;
}
