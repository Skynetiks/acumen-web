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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilter } from "lucide-react";

interface UniversityFilterModalProps {
  onFilter: (filters: any) => void;
}

export function ApplicationFilterModal({
  onFilter,
}: UniversityFilterModalProps) {
  const [degree, setDegree] = useState("All");
  const [program, setProgram] = useState("All");
  const [date, setDate] = useState("September 2025");

  const handleFilter = () => {
    onFilter({
      degree: degree === "All" ? "" : degree,
      program: program === "All" ? "" : program,
      date: date,
    });
  };

  const handleReset = () => {
    setDegree("All");
    setProgram("All");
    setDate("September 2025");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2 rounded-full flex items-center">
          <span className="p-1 bg-white rounded-full">
            <ListFilter className="h-4 w-4 text-primary" strokeWidth={3} />
          </span>
          <span>Filters&nbsp;</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold">
            Filter Applications
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium ">
              Enter university name
            </label>
            <Input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="All"
              className="w-full"
            />
          </div>

          {/* University Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium ">University Type</label>
            <Select value={program} onValueChange={setProgram}>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
