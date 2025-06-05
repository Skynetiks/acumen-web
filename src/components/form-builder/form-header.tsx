"use client";

import { ArrowLeft } from "lucide-react";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  showBackButton?: boolean;
  progress: number;
}

export function FormHeader({
  title,
  subtitle,
  onBack,
  showBackButton = true,
  progress,
}: FormHeaderProps) {
  return (
    <div className="">
      {showBackButton && (
        <ArrowLeft
          strokeWidth={3}
          size={26}
          className="cursor-pointer text-primary"
          onClick={onBack}
        />
      )}

      <div className="space-y-1 pt-4">
        <h1 className="text-xl font-medium text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-xs">{subtitle}</p>
        )}
      </div>

      <div className={`w-full bg-gray-200 rounded-full mt-6 h-3`}>
        <div
          className="h-3 rounded-full transition-all duration-300 ease-in-out flex items-center justify-end bg-primary"
          style={{
            width: `${progress}%`,
          }}
        >
          <div className="w-1 mr-1 aspect-[1/1] rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
