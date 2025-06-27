import LoginScreen from "@/feature/auth/component/login-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/login/")({
  component: Login,
});

function Login() {
  return <LoginScreen />;
}
