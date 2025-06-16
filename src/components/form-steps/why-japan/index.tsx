"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  whyJapanSchema,
  type WhyJapanData,
} from "@/components/form-steps/lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "../base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchWhyJapanReasonOptions } from "./data/api";

export function WhyJapanStep(props: FormStepProps<WhyJapanData>) {
  const { data, isLoading, config } = props;
  const { data: reasonOptions } = useSuspenseQuery({
    queryKey: [`${config.id}-form-options`],
    queryFn: fetchWhyJapanReasonOptions,
  });
  const form = useForm<WhyJapanData>({
    resolver: zodResolver(whyJapanSchema),
    defaultValues: data,
    mode: "onChange",
  });

  return (
    <BaseFormStep {...props} form={form}>
      <FormField
        control={form.control}
        name="whyJapan"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">
              Reasons for Studying in Japan
            </FormLabel>
            <FormControl>
              <div className="space-y-3 mt-3">
                {reasonOptions.map((reason) => {
                  const isSelected = field.value?.includes(reason.value);

                  return (
                    <CustomToggle
                      key={reason.value}
                      pressed={isSelected ?? false}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, reason.value]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== reason.value)
                          );
                        }
                      }}
                      className="w-full text-left p-4 border rounded-lg hover:bg-muted flex flex-col items-start gap-2"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="font-medium">{reason.label}</span>
                      </div>
                    </CustomToggle>
                  );
                })}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </BaseFormStep>
  );
}
