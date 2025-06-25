import { usePagination } from "@/hooks/use-pagination";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { fetchApplications } from "./data/api";
import type { Application, ParamsType } from "./data/schema";
import { LoadMoreTrigger } from "@/components/load-more-button";
import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import { ApplicationSearchAndFilter } from "./component/application-filter";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ApplicationsPage({ params }: { params: ParamsType }) {
  const { items, loadMoreRef, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePagination<ParamsType, Application>({
      queryKey: ["applications"],
      fetchFn: fetchApplications,
      filters: {
        search: params.search,
        degree: params.degree,
        program: params.program,
        date: params.date,
      },
      //   pageSize: PAGE_SIZE,
    });
  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-between p-4 gap-6">
          <div className="flex-1 flex-col flex">
            <div className="flex justify-between items-center gap-4">
              <header className="block md:hidden">
                <SidebarTrigger className="lg:hidden text-primary" />
              </header>
              <PageTitle title="My Applications" />
              <div />
            </div>
          </div>
        </div>
      </PageHeader>

      <ApplicationSearchAndFilter />

      {/* Applications List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-8">
        {items.map((application) => (
          <Link
            to={"/application/$applicationId"}
            params={{ applicationId: application.id }}
            key={application.id}
          >
            <div className="border border-primary rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className="pt-1 flex items-start h-full justify-start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5293 2.59863L8.56878 0.102345C8.18949 -0.0336833 7.78026 -0.0336993 7.40122 0.1023L0.440637 2.59804C-0.146752 2.80859 -0.146721 3.71525 0.440683 3.92585L1.65417 4.36102C1.38793 4.74517 1.22426 5.21379 1.20805 5.72697C0.96776 5.88773 0.798588 6.17781 0.7986 6.5241C0.798611 6.83807 0.940354 7.10224 1.14448 7.27117L0.507538 10.617C0.452153 10.908 0.641806 11.1841 0.897076 11.1841L2.2972 11.1842C2.55272 11.1842 2.74235 10.9081 2.68694 10.6171L2.04978 7.27121C2.25389 7.10229 2.39561 6.83813 2.3956 6.52417C2.39559 6.18719 2.23413 5.90525 2.00481 5.74156C2.02376 5.30411 2.21538 4.91733 2.52105 4.67211L7.40119 6.42242C7.62727 6.5034 8.06096 6.60448 8.56875 6.42247L15.5293 3.92673C16.117 3.71589 16.1169 2.80952 15.5293 2.59863ZM8.80334 7.31341C8.09144 7.56852 7.48482 7.42753 7.16667 7.31335L3.54792 6.01569L3.1942 9.3202C3.19423 10.3498 5.33923 11.1843 7.98526 11.1844C10.6313 11.1845 12.7762 10.3501 12.7762 9.32057L12.4222 6.01574L8.80334 7.31341Z"
                      fill="#E63963"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-primary">
                    {application.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {application.program} ({application.degree})
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {application.date}
                </span>
                <ChevronRight
                  className="h-5 w-5 text-primary"
                  strokeWidth={4}
                />
              </div>
            </div>
          </Link>
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
