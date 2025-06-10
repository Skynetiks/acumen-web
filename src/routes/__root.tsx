import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import TailwindIndicator from "@/components/ui/tailwind-indicator";
import Page from "@/components/page";

export const Route = createRootRoute({
  component: () => (
    <>
      <Page>
        <Outlet />
      </Page>
      <TanStackRouterDevtools />
      <TailwindIndicator />
    </>
  ),
});
