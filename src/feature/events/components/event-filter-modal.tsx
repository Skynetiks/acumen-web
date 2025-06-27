import { Button } from "@/components/ui/button";
import { MapPin, ChevronRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs";

import {
  eventFilters,
  type EventFiltersType,
  type EventTypeType,
} from "../data/schema";

import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import { ResponsiveFilterWrapper } from "@/components/filter-wrapper";
import { PriceGraphSlider } from "@/components/ui/slider-with-graph";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EventFiltersQueryKey } from "../data/constants";
import { getEventPriceDistribution } from "../data/api";

export default function EventFilterDrawer() {
  const { data: priceDistribution } = useSuspenseQuery({
    queryKey: EventFiltersQueryKey,
    queryFn: () => getEventPriceDistribution(),
  });
  const [timeDate, setTimeDate] = useQueryState(
    "timeDate",
    parseAsString.withDefault("tomorrow"),
  );
  const [eventType, setEventType] = useQueryState<EventTypeType>(
    "eventType",
    parseAsStringEnum(["online", "offline"]).withDefault("offline"),
  );
  const [location, setLocation] = useQueryState(
    "location",
    parseAsString.withDefault("New Delhi"),
  );
  const [priceMin, setPriceMin] = useQueryState(
    "priceMin",
    parseAsInteger.withDefault(10),
  );
  const [priceMax, setPriceMax] = useQueryState(
    "priceMax",
    parseAsInteger.withDefault(200),
  );

  const form = useForm<EventFiltersType>({
    resolver: zodResolver(eventFilters),
    defaultValues: {
      timeDate,
      eventType,
      location,
      priceRange: { min: priceMin, max: priceMax },
    },
  });

  const handleSubmit = (data: EventFiltersType) => {
    console.log(data);
    setTimeDate(data.timeDate || "");
    setEventType(data.eventType || "offline");
    setLocation(data.location || "");
    setPriceMin(data.priceRange.min);
    setPriceMax(data.priceRange.max);
  };

  const handleReset = () => {
    setTimeDate("tomorrow");
    setEventType("offline");
    setLocation("New Delhi");
    setPriceMin(10);
    setPriceMax(200);
    form.reset();
  };

  const selectedValue = form.watch("timeDate");
  const isDateSelected =
    selectedValue &&
    !["today", "tomorrow", "this-week"].includes(selectedValue);
  const parsedDate = isDateSelected ? new Date(selectedValue) : undefined;
  const formId = "event-filter-form";
  return (
    <ResponsiveFilterWrapper
      formId={formId}
    >
      <Form {...form}
      >
        <form id={formId} className="space-y-8" noValidate
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={handleReset}
        >
          {/* Time & Date */}
          <div>
            <h3 className="font-semibold mb-4 text-[17px]">Time & Date</h3>
            <FormField
              control={form.control}
              name="timeDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <div className="flex gap-3 mb-5">
                        {["today", "tomorrow", "this-week"].map((value) => (
                          <Button
                            key={value}
                            type="button"
                            variant="default"
                            className={`rounded-full px-4 font-medium border ${field.value === value
                              ? "bg-primary text-white"
                              : "bg-transparent border-gray-200 text-gray-600 hover:text-white"
                              }`}
                            onClick={() => field.onChange(value)}
                          >
                            {value
                              .replace("-", " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Button>
                        ))}
                      </div>
                      <div className="max-w-max">
                        <DatePicker
                          value={parsedDate}
                          triggerText="Choose from Calendar"
                          triggerClassName={cn(
                            "border-none text-primary font-medium",
                            parsedDate ? "bg-primary text-white" : "bg-[unset]",
                          )}
                          onChange={(date) => {
                            if (date) field.onChange(date.toISOString());
                          }}
                        />
                      </div>
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Event Type */}
          <div>
            <h3 className="font-semibold mb-4 text-[17px]">Event Type</h3>
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex gap-3">
                      {["online", "offline"].map((value) => (
                        <Button
                          key={value}
                          type="button"
                          variant="default"
                          className={`rounded-full px-8 font-medium border ${field.value === value
                            ? "bg-primary text-white"
                            : "bg-transparent border-gray-200 text-gray-600 hover:text-white"
                            }`}
                          onClick={() => field.onChange(value)}
                        >
                          {value[0].toUpperCase() + value.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Location */}
          <div>
            <h3 className="font-semibold mb-4">Location</h3>
            <div className="max-w-max flex items-center gap-4 rounded-2xl cursor-pointer select-none">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
              </div>
              <span className="flex-1 font-medium text-[17px]">{location}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[17px]">Select price range</h3>
              <span className="text-primary font-semibold text-[17px]">
                ${form.watch("priceRange").min} - $
                {form.watch("priceRange").max}
              </span>
            </div>
            <FormField
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="px-2">
                      <PriceGraphSlider
                        value={[field.value.min, field.value.max]}
                        onChange={(val) => {
                          return form.setValue("priceRange", { min: val[0], max: val[1] }, {
                            shouldDirty: true,
                            shouldTouch: true,
                            shouldValidate: false,
                          })
                        }
                        }
                        max={200}
                        min={10}
                        step={10}
                        distribution={priceDistribution}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </ResponsiveFilterWrapper>
  );
}
