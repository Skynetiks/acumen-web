// components/UniversitySearchAndFilter.tsx
"use client";

import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ApplicationFilterModal } from "./application-filter-modal";

export function ApplicationSearchAndFilter() {
  const searchParams = useSearch({ from: "/application/" });
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState(searchParams.search || "");

  // Update search param in URL on debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate({
        to: "/application",
        search: { search: searchQuery },
      });
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleFilter = (newFilters: Record<string, string | undefined>) => {
    navigate({
      to: "/application",
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
        <ApplicationFilterModal onFilter={handleFilter} />
      </div>
    </div>
  );
}
