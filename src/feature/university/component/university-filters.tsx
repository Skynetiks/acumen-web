// components/UniversitySearchAndFilter.tsx
"use client";

import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { UniversityFilterModal } from "./university-filter-modal";

export function UniversitySearchAndFilter() {
  const searchParams = useSearch({ from: "/university/" });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(searchParams.search || "");

  // Update search param in URL on debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        to: "/university",
        search: { search: searchQuery },
      });
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // handleFilter will receive a filters object (like { country: 'uk', stream: 'cs' })
  const handleFilter = (newFilters: Record<string, string | undefined>) => {
    navigate({
      to: "/university",
      search: {
        ...searchParams,
        ...newFilters,
      },
    });
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-none"
          />
        </div>
        <UniversityFilterModal onFilter={handleFilter} />
      </div>
    </div>
  );
}
