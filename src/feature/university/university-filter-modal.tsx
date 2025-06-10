"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface UniversityFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: any) => void;
}

export function UniversityFilterModal({
  isOpen,
  onClose,
  onFilter,
}: UniversityFilterModalProps) {
  const [courseName, setCourseName] = useState("All");
  const [universityType, setUniversityType] = useState("All");
  const [beginAt, setBeginAt] = useState("September 2025");

  const handleFilter = () => {
    onFilter({
      courseName: courseName === "All" ? "" : courseName,
      universityType: universityType === "All" ? "" : universityType,
      beginAt: beginAt,
    });
  };

  const handleReset = () => {
    setCourseName("All");
    setUniversityType("All");
    setBeginAt("September 2025");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold">
            Filter Universities
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium ">Enter Course Name</label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="All"
              className="w-full"
            />
          </div>

          {/* University Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium ">University Type</label>
            <Select value={universityType} onValueChange={setUniversityType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="National">National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Begin At */}
          <div className="space-y-2">
            <label className="text-sm font-medium ">Begin at</label>
            <Input
              value={beginAt}
              onChange={(e) => setBeginAt(e.target.value)}
              placeholder="September 2025"
              className="w-full"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button onClick={handleFilter} className="w-full py-3">
              Filter
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full py-3"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
