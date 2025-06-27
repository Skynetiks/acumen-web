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
      <PageWrapper className="justify-center bg-gray-100">
        <Card
          className={cn(
            "w-full h-[100dvh] border-none md:border shadow-none md:shadow-lg",
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
          "w-full h-[100dvh] shadow-none md:shadow-lg border-none md:border",
          className
        )}
      >
        <CardContent className="px-8 h-full flex flex-col gap-4 w-full overflow-hidden">
          {/* Header */}
          {config.showProgress !== false && (
            <div className="shrink-0">
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
            </div>
          )}

          {/* Step content */}
          <div className="grow overflow-auto w-full">
            {!hasHydrated ? (
              <div className="flex justify-center items-center h-full">
                <Loader size={16} className="animate-spin" />
              </div>
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
