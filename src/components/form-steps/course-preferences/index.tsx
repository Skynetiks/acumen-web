import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  coursePreferencesSchema,
  type CoursePreferencesData,
} from "@/components/form-steps/lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCoursePreferences } from "./data/api";

export function CoursePreferencesStep(
  props: FormStepProps<CoursePreferencesData>
) {
  const { data, isLoading, config } = props;
  const { data: courses } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchCoursePreferences,
  });

  const form = useForm<CoursePreferencesData>({
    resolver: zodResolver(coursePreferencesSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BaseFormStep {...props} form={form}>
      <div className="space-y-6">
        {/* Search Field */}
        <div className="space-y-2">
          <FormLabel className="text-sm font-medium">Search Courses</FormLabel>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Ex: Social Science, Engineering..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Course Selection */}
        <FormField
          control={form.control}
          name="coursePreferences"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-wrap gap-4">
                  {filteredCourses.map((course) => {
                    const isSelected =
                      field.value?.includes(course.value) ?? false;

                    return (
                      <CustomToggle
                        key={course.id}
                        className="max-w-max"
                        pressed={isSelected}
                        onPressedChange={(pressed) => {
                          const currentValue = field.value || [];
                          if (pressed) {
                            field.onChange([...currentValue, course.value]);
                          } else {
                            field.onChange(
                              currentValue.filter((v) => v !== course.value)
                            );
                          }
                        }}
                        disabled={isLoading}
                      >
                        <span className="">{course.label}</span>
                      </CustomToggle>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </BaseFormStep>
  );
}
