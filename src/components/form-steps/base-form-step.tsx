"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { FormStepProps } from "@/types/form.types";
import { Form } from "@/components/ui/form";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface BaseFormStepProps<T extends FieldValues> extends FormStepProps<T> {
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  submitButtonText?: string;
  showSkipButton?: boolean;
}

export function BaseFormStep<T extends FieldValues>({
  children,
  form,
  onSubmit,
  onSkip,
  isLoading,
  config,
  submitButtonText,
  showSkipButton = false,
}: BaseFormStepProps<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full min-h-0 flex flex-col justify-between gap-4"
      >
        <div className=" md:h-[88%] overflow-y-auto flex flex-col gap-8">
          {children}
        </div>

        <div className="md:h-[12%] justify-self-end flex justify-end items-center gap-4">
          <Button
            type="submit"
            className={`w-full md:w-max py-3`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              submitButtonText || config.buttonText || "Proceed to Next"
            )}
          </Button>

          {showSkipButton && onSkip && (
            <Button
              type="button"
              variant="outline"
              className="w-full md:w-max py-3"
              onClick={onSkip}
              disabled={isLoading}
            >
              Skip this step
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
