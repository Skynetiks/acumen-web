import LoginScreenWithEmail from "@/feature/auth/component/login-email-screen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth/login-email/")({
  component: Login,
});

function Login() {
  return <LoginScreenWithEmail />;
}
