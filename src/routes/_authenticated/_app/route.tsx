import { createFileRoute, redirect } from "@tanstack/react-router";
import AppSidebar from "@/components/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_app")({
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
    <SidebarProvider>
      <div className="flex min-h-[100dvh] w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full min-w-0">
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
