import { useState, useEffect } from "react";
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
import { MonthYearPicker } from "@/components/ui/month-year-picker";

interface UniversityFilterModalProps {
  onFilter: (filters: {
    courseName: string;
    universityType: string;
    beginAt: string;
  }) => void;
  filters: {
    courseName: string;
    universityType: string;
    beginAt: string;
  };
}

export function UniversityFilterModal({
  onFilter,
  filters,
}: UniversityFilterModalProps) {
  const [courseName, setCourseName] = useState(filters.courseName || "");
  const [universityType, setUniversityType] = useState(
    filters.universityType || ""
  );
  const [beginAt, setBeginAt] = useState(filters.beginAt || "September 2025");

  // Keep local state synced with props
  useEffect(() => {
    setCourseName(filters.courseName);
    setUniversityType(filters.universityType);
    setBeginAt(filters.beginAt);
  }, [filters]);

  const handleFilter = () => {
    onFilter({
      courseName: courseName.trim(),
      universityType: universityType.trim(),
      beginAt: beginAt.trim(),
    });
  };

  const handleReset = () => {
    setCourseName("");
    setUniversityType("");
    setBeginAt("September 2025");

    onFilter({
      courseName: "",
      universityType: "",
      beginAt: "September 2025",
    });
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
            Filter Universities
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Course Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Enter Course Name</label>
            <Input
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="All"
              className="w-full"
            />
          </div>

          {/* University Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">University Type</label>
            <Select
              value={universityType || "All"}
              onValueChange={(v) => setUniversityType(v === "All" ? "" : v)}
            >
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
            <label className="text-sm font-medium">Begins At</label>
            <MonthYearPicker
              value={beginAt}
              onChange={(val) => setBeginAt(val)}
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
