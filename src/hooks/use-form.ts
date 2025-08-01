
import { useEffect, useMemo } from "react";
import type { FormConfig } from "@/types/form.types";
import { createFormStore } from "@/lib/form-store.factory";
import { queryClient } from "@/lib/queryClient";
import { useAuth } from "@/lib/providers/auth-context";
import { useNavigate } from "@tanstack/react-router";

// Custom hook for form management
export function useForm(config: FormConfig, initialData?: Record<string, any>) {
  const { user } = useAuth()
  const navigate = useNavigate()
  if (!user || Object.keys(user).length === 0) {
    navigate({ to: "/auth/login" })
  }
  // Create store instance with useMemo to prevent recreation
  const useStore = useMemo(() => createFormStore(config, user!), [config, user]);
  const store = useStore();

  // Populate form with initial data only once
  useEffect(() => {
    if (!store._hasHydrated) return;
    if (initialData && Object.keys(initialData).length > 0) {
      store.populateForm(initialData);
    }
  }, [store._hasHydrated, initialData]); // Empty dependency array to run only once

  //prefetch next form step
  useEffect(() => {
    if (!config) return;
    const nextStep = config.steps[store.currentStep];
    if (nextStep?.prefetchData && nextStep.id && nextStep.queryFn) {
      queryClient.prefetchQuery({
        queryKey: [`${nextStep.id}-form-options`],
        queryFn: nextStep.queryFn,
      });
    }
  }, [store.currentStep, config]);

  // Get current step configuration
  const currentStepConfig = useMemo(() => {
    if (store.currentStep > config.steps.length) return null;
    return config.steps[store.currentStep - 1];
  }, [store.currentStep, config.steps]);

  // Current step data
  const currentStepData = useMemo(() => {
    if (!currentStepConfig) return {};
    return store.formData[currentStepConfig.id] || {};
  }, [store.formData, currentStepConfig]);

  const currentStepErrors = useMemo(() => {
    if (!currentStepConfig) return {};
    return store.errors[currentStepConfig.id] || {};
  }, [store.errors, currentStepConfig?.id]);

  // Handle step submission
  const handleStepSubmit = async (data: any) => {
    if (!currentStepConfig) return;

    try {
      store.setLoading(true);
      store.setErrors(currentStepConfig.id, {});

      // Validate data
      const validatedData = currentStepConfig.schema.parse(data);
      // Update store
      store.updateFormData(currentStepConfig.id, validatedData);

      // Custom step submission logic
      if (currentStepConfig.onSubmit) {
        await currentStepConfig.onSubmit(validatedData);
      }

      // Move to next step or submit form
      if (store.currentStep === config.steps.length) {
        await store.submitForm();
      } else {
        store.nextStep();
      }
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const formattedErrors = error.errors.reduce((acc: any, err: any) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        store.setErrors(currentStepConfig.id, formattedErrors);
      } else {
        console.error("Step submission error:", error);
      }
    } finally {
      store.setLoading(false);
    }
  };

  // Handle step skip
  const handleStepSkip = async () => {
    if (!currentStepConfig) return;

    try {
      if (currentStepConfig.onSkip) {
        await currentStepConfig.onSkip();
      }
      store.skipStep();
    } catch (error) {
      console.error("Step skip error:", error);
    }
  };

  // Form context
  const formContext = useMemo(
    () => ({
      formId: config.id,
      totalSteps: config.steps.length,
      currentStep: store.currentStep,
      allData: store.formData,
      metadata: store.metadata,
    }),
    [
      config.id,
      config.steps.length,
      store.currentStep,
      store.formData,
      store.metadata,
    ]
  );

  return {
    // Store state
    currentStep: store.currentStep,
    formData: store.formData,
    isLoading: store.isLoading,
    errors: store.errors,
    isCompleted: store.isCompleted,
    metadata: store.metadata,
    // Store actions
    setCurrentStep: store.setCurrentStep,
    updateFormData: store.updateFormData,
    nextStep: store.nextStep,
    prevStep: store.prevStep,
    setLoading: store.setLoading,
    resetForm: store.resetForm,
    submitForm: store.submitForm,
    populateForm: store.populateForm,
    // Current step info
    currentStepConfig,
    currentStepData,
    currentStepErrors,
    // Handlers
    handleStepSubmit,
    handleStepSkip,
    // Context
    formContext,
    // Computed values
    isFirstStep: store.currentStep === 1,
    isLastStep: store.currentStep === config.steps.length,
    progress: (store.currentStep / config.steps.length) * 100,
    // has hydrated
    hasHydrated: store._hasHydrated,
  };
}
