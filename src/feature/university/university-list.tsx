"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { UniversityFilterModal } from "./university-filter-modal";
import { Link } from "@tanstack/react-router";
import PageWrapper from "@/components/page-wrapper";
import PageHeader from "@/components/page-header";
import NavigateBackArrow from "@/components/navigate-back-arrow";

interface University {
  id: string;
  name: string;
  courseName: string;
  universityType: string;
  beginAt: string;
  logo?: string;
}

const mockUniversities: University[] = [
  {
    id: "utsunomiya",
    name: "Utsunomiya University",
    courseName: "Humanities, Social Science and Engineering",
    universityType: "Public",
    beginAt: "July 2025",
  },
  {
    id: "aichi-bunkyo",
    name: "Aichi Bunkyo University",
    courseName: "Natural Science and Education",
    universityType: "Public",
    beginAt: "July 2025",
  },
  {
    id: "tokyo",
    name: "University of Tokyo",
    courseName: "Engineering and Technology",
    universityType: "National",
    beginAt: "October 2025",
  },
  {
    id: "kyoto",
    name: "Kyoto University",
    courseName: "Medicine and Health Sciences",
    universityType: "National",
    beginAt: "September 2025",
  },
];

export function UniversityList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredUniversities, setFilteredUniversities] =
    useState(mockUniversities);

  const handleFilter = (filters: any) => {
    let filtered = mockUniversities;

    if (filters.courseName && filters.courseName !== "All") {
      filtered = filtered.filter((uni) =>
        uni.courseName.toLowerCase().includes(filters.courseName.toLowerCase())
      );
    }

    if (filters.universityType && filters.universityType !== "All") {
      filtered = filtered.filter(
        (uni) => uni.universityType === filters.universityType
      );
    }

    if (filters.beginAt) {
      filtered = filtered.filter((uni) =>
        uni.beginAt.includes(filters.beginAt)
      );
    }

    setFilteredUniversities(filtered);
    setIsFilterOpen(false);
  };

  const searchedUniversities = filteredUniversities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageWrapper>
      <PageHeader>
        <div className="flex items-center justify-between p-4  gap-6">
          <NavigateBackArrow
            to={"/college-finder"}
            className="self-start mt-1"
          />
          <div className="flex-1 flex-col flex">
            <div className="flex justify-between items-center gap-4">
              <h1 className="text-lg font-semibold">University Finder</h1>
              <Button variant="link" className="text-primary font-medium p-0">
                Start Over
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Here's your personalized list of universities!
            </p>
          </div>
        </div>
      </PageHeader>

      {/* Search and Filter */}
      <div className="p-4 bg-background">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => setIsFilterOpen(true)}
            className="px-4 py-2 rounded-full flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* University List */}
      <div className="p-4 space-y-4">
        {searchedUniversities.map((university) => (
          <Card key={university.id} className="bg-white shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                {/* University Logo */}
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {university.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* University Details */}
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-gray-900">
                    {university.name}
                  </h3>

                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Course name
                      </p>
                      <p className="text-sm">{university.courseName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          University type
                        </p>
                        <p className="text-sm">{university.universityType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Begin at
                        </p>
                        <p className="text-sm">{university.beginAt}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <Button variant="outline" className="flex-1">
                      Apply Now
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <Link
                        to={"/university/$universityId"}
                        params={{ universityId: university.id }}
                      >
                        View Detail
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Modal */}
      <UniversityFilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilter={handleFilter}
      />
    </PageWrapper>
  );
}
