import LoginScreen from "@/feature/auth/component/login-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login/")({
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginScreen />
    </div>
  );
}
