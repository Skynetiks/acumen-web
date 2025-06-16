import PageHeader from "@/components/page-header";
import PageWrapper from "@/components/page-wrapper";
import { EventSearchAndFilter } from "./components/events-filter";
import { EventsList } from "./components/events-list";
import NavigateBackArrow from "@/components/navigate-back-arrow";
import PageTitle from "@/components/page-title";
import type { EventParamsType } from "./data/schema";

export function EventsPage({ params }: { params: EventParamsType }) {
  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-between p-4 gap-6">
          <NavigateBackArrow to="/college-finder" className="self-start mt-1" />
          <div className="flex-1 flex-col flex">
            <div className="flex justify-between items-center gap-4">
              <PageTitle title="University Finder" />
            </div>
          </div>
        </div>
      </PageHeader>
      <EventSearchAndFilter />
      <EventsList params={params} />
    </PageWrapper>
  );
}
