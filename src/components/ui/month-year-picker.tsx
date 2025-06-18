import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthYearPickerProps {
  value: string; // e.g. "September 2025"
  onChange: (val: string) => void;
  minYear?: number;
  maxYear?: number;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthYearPicker({
  value,
  onChange,
  minYear,
  maxYear,
}: MonthYearPickerProps) {
  const now = new Date();
  const currentYear = now.getFullYear();

  minYear = minYear ?? currentYear;
  maxYear = maxYear ?? currentYear + 5;

  // Parse initial value or default to current month/year
  const [selectedMonth, setSelectedMonth] = React.useState<number>(() => {
    if (!value) return now.getMonth();
    const parts = value.split(" ");
    const index = monthNames.findIndex(
      (m) => m.toLowerCase() === parts[0].toLowerCase()
    );
    return index >= 0 ? index : now.getMonth();
  });

  const [selectedYear, setSelectedYear] = React.useState<number>(() => {
    if (!value) return currentYear;
    const parts = value.split(" ");
    const yearNum = Number(parts[1]);
    return !isNaN(yearNum) ? yearNum : currentYear;
  });

  // Notify on changes
  React.useEffect(() => {
    onChange(`${monthNames[selectedMonth]} ${selectedYear}`);
  }, [selectedMonth, selectedYear, onChange]);

  const years = [];
  for (let y = minYear; y <= maxYear; y++) {
    years.push(y);
  }

  return (
    <div className="flex space-x-2">
      <Select
        value={monthNames[selectedMonth]}
        onValueChange={(val) => {
          const index = monthNames.indexOf(val);
          if (index !== -1) setSelectedMonth(index);
        }}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {monthNames.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedYear.toString()}
        onValueChange={(val) => {
          const yearNum = Number(val);
          if (!isNaN(yearNum)) setSelectedYear(yearNum);
        }}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
