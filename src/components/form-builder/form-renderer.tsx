"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormHeader } from "./form-header";
import { useForm } from "@/hooks/use-form";
import type { FormConfig } from "@/types/form.types";

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
  } = useForm(config, initialData);

  // Show success screen if completed
  if (isCompleted && config.successComponent) {
    const FormSuccess = config.successComponent;
    return (
      <div
        className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${className}`}
      >
        <Card className={`w-full max-w-md shadow-lg`}>
          <CardContent className="p-8">
            <FormSuccess />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show current step
  if (!currentStepConfig) return null;

  const StepComponent = currentStepConfig.component;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${className}`}
    >
      <Card className={`w-full max-w-md shadow-lg `}>
        <CardContent className="px-8">
          <div className="flex flex-col gap-12 justify-between">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
