import SignupScreen from "@/feature/auth/component/signup-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/signup/")({
  component: Signup,
});

function Signup() {
  return <SignupScreen />;
}
