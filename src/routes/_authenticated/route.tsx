import Page from "@/components/page";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const { user } = context.authentication;
    if (!user) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: App,
});

function App() {
  return (
    <Page>
      <Outlet />
    </Page>
  );
}
