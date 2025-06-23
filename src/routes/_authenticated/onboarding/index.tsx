import OnboardingForm from "@/feature/onboarding";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/onboarding/")({
  component: Onboarding,
});

function Onboarding() {
  const navigate = useNavigate();
  const [checkingStorage, setCheckingStorage] = useState(true);

  useEffect(() => {
    const storedData: any = localStorage.getItem("form-storage-onboarding");
    const data = JSON.parse(storedData);

    if (data && data.state.isFormCompleted) {
      navigate({ to: "/dashboard" });
    } else {
      setCheckingStorage(false); // only show form if onboarding is not complete
    }
  }, [navigate]);

  if (checkingStorage) return null; // or a loading spinner

  return <OnboardingForm />;
}
