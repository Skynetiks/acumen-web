"use client";

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
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
  id?: string;
};

interface ControlledSelectProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  options: Option[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function ControlledSelect<TFormValues extends FieldValues>({
  form,
  name,
  options,
  label,
  placeholder,
  disabled = false,
}: ControlledSelectProps<TFormValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && label !== "" ? (
            <FormLabel className="text-sm font-medium">{label}</FormLabel>
          ) : null}
          <Select
            onValueChange={field.onChange}
            value={field.value ?? ""}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className="w-full text-secondary-foreground">
                <SelectValue placeholder={placeholder ?? "Select an option"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
