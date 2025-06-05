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
  GraduationCap,
  Globe,
  Briefcase,
  TrendingUp,
  Clock,
  HelpCircle,
} from "lucide-react";
import { whyJapanSchema, type WhyJapanData } from "../../lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "./base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";

export function WhyJapanStep(props: FormStepProps<WhyJapanData>) {
  const { data, isLoading } = props;
  const form = useForm<WhyJapanData>({
    resolver: zodResolver(whyJapanSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const reasonOptions = [
    {
      id: "world-class-education",
      label: "World Class Education",
      description:
        "Access to top-ranked universities and cutting-edge research",
      icon: GraduationCap,
    },
    {
      id: "international-exposure",
      label: "International Exposure",
      description: "Experience diverse cultures and global perspectives",
      icon: Globe,
    },
    {
      id: "migration",
      label: "Migration",
      description: "Long-term settlement and permanent residency opportunities",
      icon: TrendingUp,
    },
    {
      id: "career-development",
      label: "Career Development",
      description: "Enhanced job prospects and professional growth",
      icon: Briefcase,
    },
    {
      id: "work-experience",
      label: "Short-medium term work experience",
      description: "Gain valuable international work experience",
      icon: Clock,
    },
    {
      id: "other",
      label: "Other",
      description: "Personal or unique reasons for choosing Japan",
      icon: HelpCircle,
    },
  ];

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
                  const IconComponent = reason.icon;
                  const isSelected = field.value?.includes(reason.id) || false;

                  return (
                    <CustomToggle
                      key={reason.id}
                      pressed={isSelected ?? false}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, reason.id]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== reason.id)
                          );
                        }
                      }}
                      className="w-full text-left p-4 border rounded-lg hover:bg-muted flex flex-col items-start gap-2"
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <IconComponent className="h-5 w-5 text-primary" />
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
