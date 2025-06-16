import { FormRenderer } from "@/components/form-builder/form-renderer";
import { getUniversityApplicationConfig } from "./config/university-application.config";
import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import getUserData from "./data/api";

export default function ApplyPage() {
  const { universityId } = useParams({
    from: "/university/$universityId/apply/",
  });
  const { data: userData } = useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getUserData,
  });

  const formConfig = getUniversityApplicationConfig(universityId);
  return <FormRenderer config={formConfig} initialData={userData} />;
}
