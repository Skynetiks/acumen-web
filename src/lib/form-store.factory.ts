import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FormStore, FormConfig, FormState } from "@/types/form.types";
import type { StoredUser } from "./providers/auth-context";

// Factory function to create form stores
export function createFormStore(config: FormConfig, user: StoredUser) {
  const initialState: FormState = {
    currentStep: 1,
    formData: config.initialData || {},
    isLoading: false,
    errors: {},
    isCompleted: false,
    metadata: {},
    _hasHydrated: false,
    setHasHydrated: () => { },
  };

  return create<FormStore>()(
    config.persistData
      ? persist(
        (set, get) => {
          const store = createFormActions(set, get, config, initialState);
          return {
            ...store,
            _hasHydrated: false,
            setHasHydrated: (value: boolean) => set({ _hasHydrated: value }),
          };
        },
        {
          name: `form-storage-${config.id}-${user.userId}`,
          partialize: (state) => ({
            isFormCompleted: state.isCompleted,
            currentStep: state.currentStep,
            formData: state.formData,
            metadata: state.metadata,
          }),
          onRehydrateStorage: (state) => {
            return () => state.setHasHydrated(true);
          },
        }
      )
      : (set, get) => ({
        ...createFormActions(set, get, config, initialState),
        _hasHydrated: true, // no persistence means instantly hydrated
      })
  );
}

function createFormActions(
  set: any,
  get: any,
  config: FormConfig,
  initialState: FormState
) {
  return {
    ...initialState,
    config,

    setConfig: (newConfig: FormConfig) => set({ config: newConfig }),

    setCurrentStep: (step: number) => {
      const currentState = get();
      if (currentState.currentStep !== step) {
        set({ currentStep: step });
        config.onStepChange?.(step, config.steps.length);
      }
    },

    updateFormData: (stepId: string, data: any) => {
      const currentState = get();
      set({
        formData: { ...currentState.formData, [stepId]: data },
        errors: { ...currentState.errors, [stepId]: {} },
      });
    },

    nextStep: () => {
      const { currentStep } = get();
      const nextStep = Math.min(currentStep + 1, config.steps.length + 1);
      if (currentStep !== nextStep) {
        set({ currentStep: nextStep });
        config.onStepChange?.(nextStep, config.steps.length);
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      const prevStep = Math.max(currentStep - 1, 1);
      if (currentStep !== prevStep) {
        set({ currentStep: prevStep });
        config.onStepChange?.(prevStep, config.steps.length);
      }
    },

    skipStep: () => {
      const { currentStep } = get();
      const currentStepConfig = config.steps[currentStep - 1];
      if (currentStepConfig?.isOptional || config.allowSkip) {
        get().nextStep();
      }
    },

    setLoading: (loading: boolean) => {
      const currentState = get();
      if (currentState.isLoading !== loading) {
        set({ isLoading: loading });
      }
    },

    setErrors: (stepId: string, errors: any) => {
      const currentState = get();
      set({
        errors: { ...currentState.errors, [stepId]: errors },
      });
    },

    resetForm: () => set({ ...initialState, config }),

    populateForm: (data: Record<string, any>) => {
      const currentState = get();
      set({
        formData: { ...currentState.formData, ...data },
      });
    },

    submitForm: async () => {
      const { formData, setLoading } = get();
      setLoading(true);

      try {
        const result = config.validationSchema.safeParse(formData);
        if (result.error)
          throw new Error("Validation failed: -" + result.error);
        else {
          await config.onComplete?.(formData);
          set({ isCompleted: true, currentStep: 1 });
        }
      } catch (error) {
        console.error("Form submission error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
  };
}
