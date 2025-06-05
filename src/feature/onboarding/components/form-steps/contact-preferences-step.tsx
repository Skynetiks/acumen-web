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
  Sun,
  Sunset,
  Moon,
  Mail,
  Phone,
  MessageCircle,
  Users,
} from "lucide-react";
import {
  contactPreferencesSchema,
  type ContactPreferencesData,
} from "../../lib/form-schemas";
import type { FormStepProps } from "@/types/form.types";
import { BaseFormStep } from "./base-form-step";
import { CustomToggle } from "@/components/ui/custom-toggle";

export function ContactPreferencesStep(
  props: FormStepProps<ContactPreferencesData>
) {
  const { isLoading, data } = props;

  const form = useForm<ContactPreferencesData>({
    resolver: zodResolver(contactPreferencesSchema),
    defaultValues: data,
    mode: "onChange",
  });

  const timeOptions = [
    {
      id: "morning",
      label: "Morning - 9AM to noon",
      description: "Best for detailed discussions",
      icon: Sun,
    },
    {
      id: "afternoon",
      label: "Afternoon 12PM - 4 PM",
      description: "Good for quick consultations",
      icon: Sunset,
    },
    {
      id: "evening",
      label: "Evening 5 PM - 8 PM",
      description: "After work hours",
      icon: Moon,
    },
  ];

  const methodOptions = [
    {
      id: "email",
      label: "Email",
      description: "Detailed information and documents",
      icon: Mail,
    },
    {
      id: "call",
      label: "Call",
      description: "Direct voice conversation",
      icon: Phone,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      description: "Quick messages and updates",
      icon: MessageCircle,
    },
    {
      id: "all",
      label: "All Methods",
      description: "Use any method as needed",
      icon: Users,
    },
  ];
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
                {timeOptions.map((time) => {
                  const Icon = time.icon;
                  const isActive = field.value?.includes(time.id);
                  return (
                    <CustomToggle
                      key={time.id}
                      pressed={isActive}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, time.id]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== time.id)
                          );
                        }
                      }}
                      disabled={isLoading}
                      className=""
                    >
                      <div className="w-full p-2 flex gap-4 items-center justify-start">
                        <Icon className="h-5 w-5 text-primary mt-1" />
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
                {methodOptions.map((method) => {
                  const Icon = method.icon;
                  const isActive = field.value?.includes(method.id);
                  return (
                    <CustomToggle
                      key={method.id}
                      pressed={isActive}
                      onPressedChange={(pressed) => {
                        const currentValue = field.value || [];
                        if (pressed) {
                          field.onChange([...currentValue, method.id]);
                        } else {
                          field.onChange(
                            currentValue.filter((v) => v !== method.id)
                          );
                        }
                      }}
                      disabled={isLoading}
                    >
                      <div className="w-full p-2 flex gap-4 items-center justify-start">
                        <Icon className="h-6 w-6 text-primary" />
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
