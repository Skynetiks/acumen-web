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
  studyPreferencesSchema,
  type StudyPreferencesData,
} from "@/components/form-steps/lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchStudyPreferencesData } from "./data/api";
import { ControlledSelect } from "@/components/ui/controlled-select";

export function StudyPreferencesStep(
  props: FormStepProps<StudyPreferencesData>
) {
  const { data, isLoading, config } = props;
  const { data: studyPreferences } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchStudyPreferencesData,
  });

  const form = useForm<StudyPreferencesData>({
    resolver: zodResolver(studyPreferencesSchema),
    defaultValues: data,
    mode: "onChange",
  });

  return (
    <BaseFormStep {...props} form={form}>
      <div className="space-y-6">
        {/* Preferred Level of Study */}
        <ControlledSelect<StudyPreferencesData>
          form={form}
          name="preferredLevelOfStudy"
          placeholder="Preferred Level of Study"
          options={studyPreferences.preferredLevelOfStudyOptions}
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
                  {studyPreferences.yearOptions.map((year) => {
                    const value = year.label + year.value;
                    const isSelected = field.value?.includes(value);
                    return (
                      <CustomToggle
                        key={year.value}
                        pressed={isSelected ?? false}
                        onPressedChange={(pressed) => {
                          if (pressed) {
                            field.onChange(value);
                          } else if (value === field.value) {
                            field.onChange("");
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
                  {studyPreferences.intakeOptions.map((intake) => {
                    const isSelected = field.value?.includes(intake.value);
                    return (
                      <CustomToggle
                        key={intake.value}
                        pressed={isSelected ?? false}
                        onPressedChange={(pressed) => {
                          if (pressed) {
                            field.onChange(intake.value);
                          } else if (intake.value === field.value) {
                            field.onChange("");
                          }
                        }}
                        className={`w-full flex flex-col gap-0 items-start justify-center text-xs
                        }`}
                        disabled={isLoading}
                      >
                        <span>
                          {intake.label.split("(")[1]?.replace(")", "")}
                        </span>
                        <span className="capitalize">{intake.value}</span>
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
