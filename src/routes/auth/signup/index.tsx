import SignupScreen from "@/feature/auth/component/signup-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/signup/")({
  component: Signup,
});

function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SignupScreen />
    </div>
  );
}
