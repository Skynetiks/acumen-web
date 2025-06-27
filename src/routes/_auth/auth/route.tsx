import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/auth")({
  beforeLoad: async ({ context }) => {
    const { user } = context.authentication;
    if (user) {
      throw redirect({ to: "/onboarding" });
    }
  },
  component: App,
});

function App() {
  return (
    <main className="">
      <Outlet />
    </main>
  );
}
