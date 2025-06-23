import type React from "react";
import type { z } from "zod";

// Base form step interface
export interface FormStepConfig<T = any> {
  id: string;
  title: string;
  subtitle?: string;
  component: React.ComponentType<FormStepProps<T>>;
  schema: z.ZodSchema<T>;
  isOptional?: boolean;
  showBackButton?: boolean;
  buttonText?: string;
  onSubmit?: (data: T) => Promise<void> | void;
  onSkip?: () => Promise<void> | void;

  prefetchData?: boolean; // should we prefetch this step’s data?
  queryFn?: () => Promise<T>; // fetcher function for this step’s data
}

// Props passed to each form step component
export interface FormStepProps<T = any> {
  data: T;
  errors: Record<string, any>;
  isLoading: boolean;
  onSubmit: (data: T) => void;
  onBack: () => void;
  onSkip?: () => void;
  config: FormStepConfig<T>;
  formContext: FormContext;
}

// Form configuration
export interface FormConfig {
  id: string;
  title?: string;
  successComponent?: React.ComponentType<any>;
  steps: FormStepConfig[];
  initialData?: Record<string, any>;
  validationSchema: z.ZodSchema<any>;
  onComplete?: (data: Record<string, any>) => Promise<void>;
  onStepChange?: (currentStep: number, totalSteps: number) => void;
  persistData?: boolean;
  showProgress?: boolean;
  allowSkip?: boolean;
}

// Form context for sharing data between steps
export interface FormContext {
  formId: string;
  totalSteps: number;
  currentStep: number;
  allData: Record<string, any>;
  metadata?: Record<string, any>;
}

// Custom styling options
export interface FormStyles {
  primaryColor?: string;
  backgroundColor?: string;
  cardClassName?: string;
  buttonClassName?: string;
  progressBarClassName?: string;
}

// Form state interface
export interface FormState {
  currentStep: number;
  formData: Record<string, any>;
  isLoading: boolean;
  errors: Record<string, any>;
  isCompleted: boolean;
  metadata: Record<string, any>;
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

// Form actions interface
export interface FormActions {
  setCurrentStep: (step: number) => void;
  updateFormData: (stepId: string, data: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: () => void;
  setLoading: (loading: boolean) => void;
  setErrors: (stepId: string, errors: any) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  populateForm: (data: Record<string, any>) => void;
}

// Store interface
export interface FormStore extends FormState, FormActions {
  config: FormConfig | null;
  setConfig: (config: FormConfig) => void;
  // 🆕 Add hydration state
}
