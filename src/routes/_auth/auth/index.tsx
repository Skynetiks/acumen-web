import AuthScreen from "@/feature/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/")({
  component: Auth,
});

function Auth() {
  return <AuthScreen />;
}
