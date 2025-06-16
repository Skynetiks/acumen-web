"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  contactPreferencesSchema,
  type ContactPreferencesData,
} from "../lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchContactPreferences } from "./data/api";

export function ContactPreferencesStep(
  props: FormStepProps<ContactPreferencesData>
) {
  const { isLoading, data, config } = props;
  const { data: contactPreferences } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchContactPreferences,
  });

  const form = useForm<ContactPreferencesData>({
    resolver: zodResolver(contactPreferencesSchema),
    defaultValues: data,
    mode: "onChange",
  });

  return (
    <BaseFormStep {...props} form={form}>
      {/* Contact Time Preferences */}
      <FormField
        control={form.control}
        name="contactTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              When should we reach out?
            </FormLabel>
            <FormControl>
              <div className="flex flex-col space-y-3 mt-3">
                {contactPreferences.contactTime.map((time) => {
                  const isActive = field.value?.includes(time.value);
                  return (
                    <CustomToggle
                      key={time.id}
                      pressed={isActive}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, time.value]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== time.value)
                          );
                        }
                      }}
                      disabled={isLoading}
                      className=""
                    >
                      <div className="w-full p-2 flex gap-4 items-center justify-start">
                        <span className="font-medium">{time.label}</span>
                      </div>
                    </CustomToggle>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Contact Method Preferences */}
      <FormField
        control={form.control}
        name="contactMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              How should we contact you?
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {contactPreferences.contactMethod.map((method) => {
                  const isActive = field.value?.includes(method.value);
                  return (
                    <CustomToggle
                      key={method.id}
                      pressed={isActive}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];

                        // user clicked on "all"
                        if (method.value === "all") {
                          if (pressed) {
                            // Selecting "all" clears everything else
                            field.onChange(["all"]);
                          } else {
                            // Deselecting "all"
                            field.onChange([]);
                          }
                          return;
                        }

                        let updated: string[] = [];

                        if (pressed) {
                          // Remove "all" if selecting a specific option
                          updated = [
                            ...currentValue.filter((v) => v !== "all"),
                            method.value,
                          ];
                        } else {
                          updated = currentValue.filter(
                            (v) => v !== method.value
                          );
                        }

                        field.onChange(updated);
                      }}
                      disabled={isLoading}
                    >
                      <div className="w-full p-2 flex gap-4 items-center justify-start">
                        <span className="font-medium">{method.label}</span>
                      </div>
                    </CustomToggle>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </BaseFormStep>
  );
}
