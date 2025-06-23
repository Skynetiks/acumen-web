import { CalendarDays, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
const formatDate = (date: Date | undefined): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
export function DatePicker({
  value,
  onChange,
  hideFuture,
  triggerText,
  triggerClassName,
}: {
  value: Date | undefined;
  onChange: (date: Date) => void;
  hideFuture?: boolean;
  triggerText?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const date = value;

  return (
    <div className=" flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              "border-input text-foreground w-full justify-between gap-2 font-normal",
              triggerClassName
            )}
          >
            <div className="flex items-center justify-start gap-2">
              <CalendarDays className="w-4 h-4 mr-2 text-inherit" />
              {date ? formatDate(date) : triggerText || "Select date"}
            </div>
            <ChevronDownIcon className="text-inherit" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            hidden={hideFuture ? { after: new Date() } : undefined}
            onSelect={(selected) => {
              if (!selected) return;
              onChange(selected);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
