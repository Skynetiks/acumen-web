import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import PageTitle from "@/components/page-title";
import NavigateBackArrow from "@/components/navigate-back-arrow";
import { fetchNotifications } from "./data/api";
import { usePagination } from "@/hooks/use-pagination";
import type { NotificationDataType } from "./data/schema";
import { LoadMoreTrigger } from "@/components/load-more-button";

export default function NotificationsPanel() {
  const { items, loadMoreRef, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePagination<{}, NotificationDataType>({
      queryKey: ["notifications"],
      fetchFn: fetchNotifications,
      filters: {},
      pageSize: 10,
    });
  console.log(items);
  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-between px-6 py-4 mb-8">
          <div className="flex items-center gap-4">
            <NavigateBackArrow to="/dashboard" />
            <PageTitle title="Notifications" />
          </div>
          <MoreVertical className="w-6 h-6" />
        </div>
      </PageHeader>

      {/* Notifications List */}
      <div className="px-6 space-y-6">
        {items.map((notification) => (
          <div key={notification.id} className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0`}
            >
              <img
                src={notification.image || "/placeholder.svg"}
                alt=""
                width={40}
                height={40}
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">
                {notification.title}
              </h3>
              <p className="text-gray-500 text-sm">{notification.timestamp}</p>
            </div>
            <Button variant="ghost" size="icon" className="p-0 text-primary">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      <div ref={loadMoreRef} className="h-8" />
      <LoadMoreTrigger
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onClick={fetchNextPage}
      />
    </PageWrapper>
  );
}
