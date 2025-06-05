"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  studyPreferencesSchema,
  type StudyPreferencesData,
} from "../../lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "./base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";

export function StudyPreferencesStep(
  props: FormStepProps<StudyPreferencesData>
) {
  const { data, isLoading } = props;

  const form = useForm<StudyPreferencesData>({
    resolver: zodResolver(studyPreferencesSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const yearOptions = [
    { value: "2025", label: "Beginning" },
    { value: "2026", label: "Beginning" },
    { value: "2027", label: "Beginning" },
  ];

  const intakeOptions = [
    { id: "spring", label: "Spring (Jan - April)", season: "Spring" },
    { id: "summer", label: "Summer (May - August)", season: "Summer" },
    { id: "fall", label: "Fall (Aug - November)", season: "Fall" },
    { id: "winter", label: "Winter (Dec - February)", season: "Winter" },
  ];

  console.log(form.getValues("preferredYearOfAdmission"));

  return (
    <BaseFormStep {...props} form={form}>
      <div className="space-y-6">
        {/* Preferred Level of Study */}
        <FormField
          control={form.control}
          name="preferredLevelOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Student Preference
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your preferred study level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="undergraduate">
                    Undergraduate (Bachelor's)
                  </SelectItem>
                  <SelectItem value="graduate">Graduate (Master's)</SelectItem>
                  <SelectItem value="postgraduate">
                    Postgraduate (Advanced Master's)
                  </SelectItem>
                  <SelectItem value="phd">PhD (Doctoral)</SelectItem>
                  <SelectItem value="certificate">
                    Certificate Program
                  </SelectItem>
                  <SelectItem value="language">Language Course</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Year of Admission */}
        <FormField
          control={form.control}
          name="preferredYearOfAdmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Preferred Year of Admission
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {yearOptions.map((year) => {
                    const isSelected = field.value?.includes(year.value);
                    return (
                      <CustomToggle
                        key={year.value}
                        pressed={isSelected ?? false}
                        onPressedChange={(pressed) => {
                          console.log(field.value);
                          const current = field.value || [];
                          if (pressed) {
                            field.onChange([...current, year.value]);
                          } else {
                            field.onChange(
                              current.filter((v) => v !== year.value)
                            );
                          }
                        }}
                        className={`w-full text-xs flex flex-col gap-0 justify-between items-center`}
                        disabled={isLoading}
                      >
                        <span>{year.label}</span>
                        <span className="font-semibold text-sm">
                          {year.value}
                        </span>
                      </CustomToggle>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Intake */}
        <FormField
          control={form.control}
          name="preferredIntake"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Preferred Intake Seasons
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {intakeOptions.map((intake) => {
                    const isSelected = field.value?.includes(intake.id);
                    return (
                      <CustomToggle
                        key={intake.id}
                        pressed={isSelected ?? false}
                        onPressedChange={(pressed) => {
                          const current = field.value || [];
                          if (pressed) {
                            field.onChange([...current, intake.id]);
                          } else {
                            field.onChange(
                              current.filter((v) => v !== intake.id)
                            );
                          }
                        }}
                        className={`w-full flex flex-col gap-0 items-start justify-center text-xs
                        }`}
                        disabled={isLoading}
                      >
                        <span>
                          {intake.label.split("(")[1]?.replace(")", "")}
                        </span>
                        <span>{intake.season}</span>
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
