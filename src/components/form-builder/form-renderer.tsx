"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormHeader } from "./form-header";
import { useForm } from "@/hooks/use-form";
import type { FormConfig } from "@/types/form.types";
import PageWrapper from "../page-wrapper";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface FormRendererProps {
  config: FormConfig;
  initialData?: Record<string, any>;
  className?: string;
}

export function FormRenderer({
  config,
  initialData,
  className,
}: FormRendererProps) {
  const {
    currentStepConfig,
    currentStepData,
    currentStepErrors,
    isLoading,
    isCompleted,
    formContext,
    handleStepSubmit,
    handleStepSkip,
    prevStep,
    progress,
    hasHydrated,
  } = useForm(config, initialData);

  // Show success screen if completed
  if (isCompleted && config.successComponent) {
    const FormSuccess = config.successComponent;
    return (
      <PageWrapper className="justify-center">
        <Card
          className={cn(
            "w-full h-full border-none md:border shadow-none",
            className
          )}
        >
          <CardContent className="p-8 h-full w-full">
            <FormSuccess />
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  // Show current step
  if (!currentStepConfig) return null;

  const StepComponent = currentStepConfig.component;

  return (
    <PageWrapper className="bg-gray-100 justify-center">
      <Card
        className={cn(
          "w-full h-screen shadow-none md:shadow-lg border-none md:border",
          className
        )}
      >
        <CardContent className="px-8 h-full flex flex-col gap-4 justify-between">
          <div className="shrink-0 h-[20%]">
            {config.showProgress !== false && (
              <FormHeader
                title={currentStepConfig.title}
                subtitle={currentStepConfig.subtitle}
                currentStep={formContext.currentStep}
                totalSteps={formContext.totalSteps}
                onBack={prevStep}
                showBackButton={
                  currentStepConfig.showBackButton !== false &&
                  formContext.currentStep > 1
                }
                progress={progress}
              />
            )}
          </div>
          <div className="grow h-[80%]">
            {!hasHydrated ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <StepComponent
                data={currentStepData}
                errors={currentStepErrors}
                isLoading={isLoading}
                onSubmit={handleStepSubmit}
                onBack={prevStep}
                onSkip={
                  currentStepConfig.isOptional || config.allowSkip
                    ? handleStepSkip
                    : undefined
                }
                config={currentStepConfig}
                formContext={formContext}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
