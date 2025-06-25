import { useQueryState, parseAsString } from "nuqs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EventFilterDrawer from "./event-filter-modal";

export function EventSearchAndFilter() {
  // sync `search` query param as string, default empty string
  const [searchQuery, setSearchQuery] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  return (
    <div className="px-4 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <Input
            placeholder="Search..."
            className="pl-12 shadow-none border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Pass current URL state or setter down for filters */}
        <EventFilterDrawer />
      </div>
    </div>
  );
}
