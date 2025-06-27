import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-component";
import ApplyPage from "@/feature/university/apply";
import { applyUserDataLoader } from "@/feature/university/apply/apply.loader";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/_app/university/$universityId/apply/"
)({
  component: RouteComponent,
  pendingComponent: () => <LoadingScreen />,
  errorComponent: (error) => (
    <ErrorComponent title={error.error.name} error={error.error} />
  ),
  loader: ({ context }) => {
    applyUserDataLoader(context.authentication.user?.userId!)
  }
  ,
});

function RouteComponent() {
  return <ApplyPage />;
}
