import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventSearchAndFilter() {
  const searchParams = useSearch({ from: "/events/" });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(searchParams.search ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        to: "/events",
        search: { ...searchParams, search: searchQuery },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleFilter = (newFilters: Record<string, string | undefined>) => {
    navigate({
      to: "/events",
      search: {
        ...searchParams,
        ...newFilters,
      },
    });
  };

  return (
    <div className="px-4 pb-2">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
          <Input
            placeholder="Search..."
            className="pl-12 border-0 bg-gray-50 rounded-full h-12 text-base placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="p-2 rounded-full flex items-center">
          <span className="p-1 bg-white rounded-full">
            <ListFilter className="h-4 w-4 text-primary" strokeWidth={3} />
          </span>
          <span>Filters&nbsp;</span>
        </Button>
        {/* <EventSearchAndFilter /> */}
      </div>
    </div>
  );
}
