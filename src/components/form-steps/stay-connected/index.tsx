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
  stayConnectedSchema,
  type StayConnectedData,
} from "@/components/form-steps/lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchStayConnectedData } from "./data/api";

export function StayConnectedStep(props: FormStepProps<StayConnectedData>) {
  const { data, config } = props;
  const { data: sourceOptions } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchStayConnectedData,
  });
  const form = useForm<StayConnectedData>({
    resolver: zodResolver(stayConnectedSchema),
    defaultValues: data,
    mode: "onChange",
  });

  return (
    <BaseFormStep {...props} form={form}>
      <FormField
        control={form.control}
        name="hearAboutUs"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Where did you hear about us?
            </FormLabel>

            <FormControl>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {sourceOptions.map((source) => {
                  const isSelected =
                    field.value?.includes(source.value) || false;

                  return (
                    <CustomToggle
                      key={source.value}
                      pressed={isSelected}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, source.value]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== source.value)
                          );
                        }
                      }}
                    >
                      <div className="flex items-center justify-center gap-4">
                        <h4 className="font-medium">{source.label}</h4>
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
