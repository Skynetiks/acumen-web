import AuthScreen from "@/feature/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: Auth,
});

function Auth() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <AuthScreen />
    </div>
  );
}
