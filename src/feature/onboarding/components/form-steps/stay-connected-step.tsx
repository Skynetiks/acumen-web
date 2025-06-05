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
import { Share2, Calendar, Users, Globe } from "lucide-react";
import {
  stayConnectedSchema,
  type StayConnectedData,
} from "../../lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "./base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";

export function StayConnectedStep(props: FormStepProps<StayConnectedData>) {
  const { data } = props;
  const form = useForm<StayConnectedData>({
    resolver: zodResolver(stayConnectedSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const sourceOptions = [
    {
      id: "social-media",
      label: "Social Media",
      description: "Facebook, Instagram, LinkedIn, Twitter",
      icon: Share2,
    },
    {
      id: "education-fair",
      label: "Education Fair",
      description: "University fairs and education events",
      icon: Calendar,
    },
    {
      id: "referral",
      label: "Referral",
      description: "Friends, family, or colleagues",
      icon: Users,
    },
    {
      id: "website",
      label: "Website",
      description: "Search engines or direct website visit",
      icon: Globe,
    },
  ];

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
                  const IconComponent = source.icon;
                  const isSelected = field.value?.includes(source.id) || false;

                  return (
                    <CustomToggle
                      key={source.id}
                      pressed={isSelected}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, source.id]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== source.id)
                          );
                        }
                      }}
                    >
                      <div className="flex items-center justify-center gap-4">
                        <IconComponent className={"h-10 w-10 text-primary"} />
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
