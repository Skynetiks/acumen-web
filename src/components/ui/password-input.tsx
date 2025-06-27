"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
// ===================== HOOKS ===================================

export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return { showPassword, setShowPassword, togglePasswordVisibility };
}

// ===================== COMPONENT ===================================

export type PasswordInputProps = {
  label?: string;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  enableCopy?: boolean;
  variant?: "create" | "update";
  disableShowPassword?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "type"
>;

export function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  error,
  onChange,
  value,
  enableCopy = false,
  variant = "create",
  id = "password-input",
  disableShowPassword = false,
  className,
  ...inputProps
}: PasswordInputProps) {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-bold text-gray-700 dark:text-white"
        >
          {label}
        </label>
      </div>

      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onCopy={(e) => {
            if (enableCopy) {
              toast.success("Password copied to clipboard", {
                description: "You can paste it anywhere now.",
              });
            } else {
              e.preventDefault();
              toast.error("Copying is disabled", {
                description: "Copying is disabled for security reasons.",
              });
            }
          }}
          className={cn(
            "w-full pl-10 pr-10 py-2.5  transition-colors duration-200",
            {
              "border-red-500": !!error,
              "ring-blue-600": !error && value.length > 0,
            },
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby="password-hint"
          aria-required="true"
          autoComplete={
            variant === "create" ? "new-password" : "current-password"
          }
          {...inputProps}
        />

        {!disableShowPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 rounded"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <div>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default PasswordInput;
