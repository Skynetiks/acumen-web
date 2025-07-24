import { FormRenderer } from "@/components/form-builder/form-renderer";
import { getUniversityApplicationConfig } from "./config/university-application.config";
import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchUserData from "./data/api";
import { useAuth } from "@/lib/providers/auth-context";

export default function ApplyPage() {
  const { user } = useAuth()
  const { universityId } = useParams({
    from: "/_authenticated/_app/university/$universityId/apply/",
  });
  const { data: userData } = useSuspenseQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUserData(user?.userId!),
  });

  const formConfig = getUniversityApplicationConfig(universityId);
  return <FormRenderer config={formConfig} initialData={userData || {}} />;
}
