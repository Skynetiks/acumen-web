import { useQueryState, parseAsString } from "nuqs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UniversityFilterModal } from "./university-filter-modal";
import { useEffect, useState } from "react";

export function UniversitySearchAndFilter() {
  // Each call returns [value, setValue] synced with URL query param
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  // Local state to debounce the input
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput, setSearch]);

  return (
    <div className="p-4 bg-background">
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-6 w-6"
            strokeWidth={3}
          />
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 border-none  shadow-none "
          />
        </div>
        <UniversityFilterModal />
      </div>
    </div>
  );
}
