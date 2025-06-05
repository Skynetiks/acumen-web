"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import type { FormConfig } from "@/types/form.types";

interface FormSuccessProps {
  config: FormConfig;
}

export function FormSuccess({ config }: FormSuccessProps) {
  const handleContinue = () => {
    // Custom success action or default navigation
    console.log("Form completed successfully!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8 text-center">
      <div className="relative">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            backgroundColor: `${config.customStyles?.primaryColor || "#E91E63"}10`,
          }}
        >
          <Sparkles
            className="w-10 h-10"
            style={{ color: config.customStyles?.primaryColor || "#E91E63" }}
          />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles
            className="w-4 h-4"
            style={{ color: config.customStyles?.primaryColor || "#E91E63" }}
          />
        </div>
        <div className="absolute -bottom-1 -left-3">
          <Sparkles
            className="w-3 h-3"
            style={{ color: config.customStyles?.primaryColor || "#E91E63" }}
          />
        </div>
        <div className="absolute top-1 -left-4">
          <Sparkles
            className="w-2 h-2"
            style={{ color: config.customStyles?.primaryColor || "#E91E63" }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h1
          className="text-2xl font-semibold"
          style={{ color: config.customStyles?.primaryColor || "#E91E63" }}
        >
          Thank You! An Expert will connect with you shortly!
        </h1>
        <p className="text-gray-600 text-sm">Let's fly into education world</p>
      </div>

      <Button
        onClick={handleContinue}
        className={`px-8 py-3 ${config.customStyles?.buttonClassName}`}
        style={{
          backgroundColor: config.customStyles?.primaryColor || "#E91E63",
          color: "white",
        }}
      >
        Continue
      </Button>
    </div>
  );
}
