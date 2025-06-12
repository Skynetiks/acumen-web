"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Search, Filter, GraduationCap, ChevronRight } from "lucide-react";

interface Application {
  id: string;
  university: string;
  program: string;
  degree: string;
  date: string;
}

const mockApplications: Application[] = [
  {
    id: "tokyo-eng",
    university: "University of Tokyo",
    program: "Engineering",
    degree: "Masters",
    date: "28 April 2025",
  },
  {
    id: "kyoto-nat",
    university: "Kyoto University",
    program: "Natural Sciences",
    degree: "PhD",
    date: "30 May 2025",
  },
  {
    id: "osaka-soc",
    university: "Osaka University",
    program: "Social Sciences",
    degree: "Bachelors",
    date: "30 May 2025",
  },
  {
    id: "tokyo-med",
    university: "Tokyo University",
    program: "Medicine / Health Sciences",
    degree: "PhD",
    date: "20 April 2025",
  },
  {
    id: "nagoya-hum",
    university: "Nagoya University",
    program: "Humanities",
    degree: "Masters",
    date: "28 May 2025",
  },
];

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-semibold mb-4">My Applications</h1>

      {/* Search and Filter */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search University..." className="pl-10" />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {mockApplications.map((application) => (
          <Link
            to={"/applications/$applicationId"}
            params={{ applicationId: application.id }}
            key={application.id}
          >
            <div className="border border-primary/20 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{application.university}</h3>
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
      </div>
    </div>
  );
}
