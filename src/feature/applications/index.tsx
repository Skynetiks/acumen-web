import { usePagination } from "@/hooks/use-pagination";
import { Link } from "@tanstack/react-router";
import { GraduationCap, ChevronRight } from "lucide-react";
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
            <div className="border border-primary/20 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
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
                <ChevronRight className="h-5 w-5 text-primary" />
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
