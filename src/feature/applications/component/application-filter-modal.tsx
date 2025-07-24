import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { MonthYearPicker } from "@/components/ui/month-year-picker";

import { ResponsiveFilterWrapper } from "@/components/filter-wrapper";
import { parseAsString, useQueryState } from "nuqs";
import {
  universityParams,
  type UniversityParamsType,
} from "@/feature/university/data/schema";

const defaultValues: UniversityParamsType = {
  courseName: "",
  universityType: "",
  beginsAt: "September 2025",
};

export function ApplicationFilterModal() {
  const [courseName, setCourseName] = useQueryState(
    "courseName",
    parseAsString.withDefault("")
  );
  const [universityType, setUniversityType] = useQueryState(
    "universityType",
    parseAsString.withDefault("")
  );
  const [beginsAt, setBeginsAt] = useQueryState(
    "beginsAt",
    parseAsString.withDefault("September 2025")
  );

  const form = useForm<UniversityParamsType>({
    resolver: zodResolver(universityParams),
    defaultValues: {
      courseName,
      universityType,
      beginsAt,
    },
  });

  const handleSubmit = (data: UniversityParamsType) => {
    setCourseName(data.courseName?.trim() || "");
    setUniversityType(data.universityType?.trim() || "");
    setBeginsAt(data.beginsAt?.trim() || "");
  };

  const handleReset = () => {
    setCourseName("");
    setUniversityType("");
    setBeginsAt("September 2025");
    form.reset(defaultValues);
  };

  return (
    <ResponsiveFilterWrapper
      formId="university-filter-form"
    >
      <span className="text-xs text-muted-foreground block pb-8">
        Note: I didn't have the applications filter so this is the dummy filter
        for now
      </span>
      <Form {...form}>
        <form
          id="university-filter-form"
          className="space-y-6"
          onSubmit={form.handleSubmit(handleSubmit)}
          onReset={handleReset}
        >
          {/* Course Name */}
          <FormField
            control={form.control}
            name="courseName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Course Name</FormLabel>
                <FormControl>
                  <Input placeholder="All" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* University Type */}
          <FormField
            control={form.control}
            name="universityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Type</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || "All"}
                    onValueChange={(val) =>
                      field.onChange(val === "All" ? "" : val)
                    }
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
                </FormControl>
              </FormItem>
            )}
          />

          {/* Begins At */}
          <FormField
            control={form.control}
            name="beginsAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Begins At</FormLabel>
                <FormControl>
                  <MonthYearPicker
                    value={field.value || ""}
                    onChange={(val) => field.onChange(val)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ResponsiveFilterWrapper>
  );
}
