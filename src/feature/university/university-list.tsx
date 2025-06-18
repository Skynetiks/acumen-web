import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import NavigateBackArrow from "@/components/navigate-back-arrow";
import UniversityCard from "./component/university-card";
import { LoadMoreTrigger } from "@/components/load-more-button";
import { Link } from "@tanstack/react-router";
import PageTitle from "@/components/page-title";
import { usePagination } from "@/hooks/use-pagination";
import { fetchUniversities } from "./data/api";
import { UniversitySearchAndFilter } from "./component/university-filters";
import type { University, UniversityParamsType } from "./data/schema";

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

  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-between p-4 gap-6">
          <NavigateBackArrow to="/college-finder" className="self-start mt-1" />
          <div className="flex-1 flex-col flex">
            <div className="flex justify-between items-center gap-4">
              <PageTitle title="University Finder" />
              <Link
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
