import { Calendar, MapPin, ChevronRight, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFilters, type EventFiltersType } from "../data/schema";

export default function EventFilter() {
  const form = useForm<EventFiltersType>({
    resolver: zodResolver(eventFilters),
    defaultValues: {
      timeDate: "tomorrow",
      eventType: "offline",
      location: "New Delhi",
      priceRange: { min: 10, max: 200 },
    },
  });

  const onSubmit = (data: EventFiltersType) => {
    console.log(data);
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-2 rounded-full flex items-center">
          <span className="p-1 bg-white rounded-full">
            <ListFilter className="h-4 w-4 text-primary" strokeWidth={3} />
          </span>
          <span>Filters&nbsp;</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-[90vh] rounded-t-3xl border-0 p-0">
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-6 pb-6 overflow-y-auto">
          <DrawerHeader className="mb-8">
            <h2 className="text-xl font-semibold text-left">Filter</h2>
          </DrawerHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Time & Date */}
              <div>
                <h3 className="font-semibold mb-4 text-[17px]">Time & Date</h3>
                <FormField
                  control={form.control}
                  name="timeDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-3 mb-5">
                          {["today", "tomorrow", "this-week"].map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant={
                                field.value === value ? "default" : "outline"
                              }
                              className={`rounded-full px-6 h-10 text-[15px] font-medium ${
                                field.value === value
                                  ? "bg-primary hover:bg-primary/90 text-white"
                                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
                              }`}
                              onClick={() => field.onChange(value)}
                            >
                              {value
                                .replace("-", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </Button>
                          ))}
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-3 text-primary cursor-pointer">
                  <Calendar className="w-5 h-5" />
                  <span className="text-[15px] font-medium">
                    Choose from calendar
                  </span>
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </div>
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
                              variant={
                                field.value === value ? "default" : "outline"
                              }
                              className={`rounded-full px-8 h-10 text-[15px] font-medium ${
                                field.value === value
                                  ? "bg-primary hover:bg-primary/90 text-white"
                                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
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
                <h3 className="font-semibold mb-4 text-[17px]">Location</h3>
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl cursor-pointer">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex-1 font-medium text-[17px]">
                    New Delhi
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-[17px]">
                    Select price range
                  </h3>
                  <span className="text-primary font-semibold text-[17px]">
                    ${form.watch("priceRange.min")} - $
                    {form.watch("priceRange.max")}
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="px-2">
                          <Slider
                            value={[field.value.min, field.value.max]}
                            onValueChange={(value) =>
                              field.onChange({ min: value[0], max: value[1] })
                            }
                            max={200}
                            min={0}
                            step={10}
                            className="w-full"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-full h-12 border-gray-200 text-gray-600 font-semibold text-[15px] hover:bg-gray-50"
                  onClick={handleReset}
                >
                  RESET
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-[15px]"
                >
                  APPLY
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
