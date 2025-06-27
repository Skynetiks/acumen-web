import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import UniversityCard from "./component/university-card";
import { LoadMoreTrigger } from "@/components/load-more-button";
import { Link, useNavigate } from "@tanstack/react-router";
import PageTitle from "@/components/page-title";
import { usePagination } from "@/hooks/use-pagination";
import { fetchUniversities } from "./data/api";
import { UniversitySearchAndFilter } from "./component/university-filters";
import type { University, UniversityParamsType } from "./data/schema";
import { ArrowLeft } from "lucide-react";

const PAGE_SIZE = 10;

export function UniversityList({
  params,
}: {
  params: {
    search?: string;
    universityType?: string;
    courseName?: string;
    beginAt?: string;
  };
}) {

  const { items, loadMoreRef, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePagination<UniversityParamsType, University>({
      queryKey: ["universities"],
      fetchFn: fetchUniversities,
      filters: {
        search: params.search,
        universityType: params.universityType,
        courseName: params.courseName,
        beginsAt: params.beginAt,
      },
      pageSize: PAGE_SIZE,
    });
  const navigate = useNavigate()
  function goBackOrFallback() {
    if (window.history.length > 2) {
      window.history.back()
    } else {
      navigate({ to: "/dashboard", replace: true });
    }
  }

  function clearOnBoardingData() {
    localStorage.removeItem("form-storage-onboarding");
    //   window.location.replace("/");
  }

  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-between p-4 gap-6">
          <span
            className="cursor-pointer self-start mt-1"
            onClick={() => goBackOrFallback()}
          >
            <ArrowLeft strokeWidth={3} size={26} className="text-primary" />
          </span>
          <div className="flex-1 flex-col flex">
            <div className="flex justify-between items-center gap-4">
              <PageTitle title="University Finder" />
              <Link
                onClick={clearOnBoardingData}
                to={"/onboarding"}
                className="text-primary font-medium text-sm p-0"
              >
                Start Over
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              Here's your personalized list of universities!
            </p>
          </div>
        </div>
      </PageHeader>

      <UniversitySearchAndFilter />

      <div className="p-4 grid grid-cols-1 gap-4 lg:grid-cols-2 ">
        {items.map((university) => (
          <UniversityCard key={university.id} university={university} />
        ))}
        <div ref={loadMoreRef} className="h-8" />
        <LoadMoreTrigger
          loadMoreRef={loadMoreRef}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onClick={fetchNextPage}
        />
      </div>
    </PageWrapper>
  );
}
