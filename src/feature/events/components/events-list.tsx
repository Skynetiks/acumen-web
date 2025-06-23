import { MapPin } from "lucide-react";
import { LoadMoreTrigger } from "@/components/load-more-button";
import { usePagination } from "@/hooks/use-pagination";
import type { EventType, EventParamsType } from "../data/schema";
import { fetchEvents } from "../data/api";
import { format } from "date-fns";
import { Link } from "@tanstack/react-router";

const PAGE_SIZE = 10;

export function EventsList({ params }: { params: EventParamsType }) {
  const { items, loadMoreRef, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePagination<EventParamsType, EventType>({
      queryKey: ["events", params],
      fetchFn: ({ pageParam, filters }) =>
        fetchEvents({ pageParam, filters, pageSize: PAGE_SIZE }),
      filters: {
        eventType: params.eventType,
        location: params.location,
        timeDate: params.timeDate,
        priceMin: params.priceMin,
        priceMax: params.priceMax,
      },
      pageSize: PAGE_SIZE,
    });

  return (
    <div className="p-8 grid grid-cols-1 gap-10 md:grid-cols-2 ">
      {items.map((event) => (
        <Link
          to="/events/$eventId"
          params={{ eventId: event.id }}
          key={event.id}
          className="flex items-start gap-4 cursor-pointer"
        >
          <div className="w-20 h-20 rounded-2xl overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 pt-1">
            <p className="text-primary text-sm mb-1">
              {format(new Date(event.date), "EEE, MMM d - h:mm a")}
            </p>
            <h3 className="font-bold text-[18px] text-gray-900 mb-2 leading-tight">
              {event.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="text-[15px]">{event.location}</span>
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
  );
}
