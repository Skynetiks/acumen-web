"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Logo from "@/components/logo";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    mobile: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^\d+$/, "Mobile number must contain only digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const agreeToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log("Signup data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Handle successful registration here
      alert(
        "Registration successful! Please check your email for verification."
      );
    } catch (error) {
      console.error("Signup error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <div className="p-6 pb-0">
        <Logo />
      </div>
      <CardContent className="p-8 space-y-8">
        {/* Sign Up Header */}
        <div>
          <h1 className="text-2xl font-semibold text-primary border-b-2 border-primary pb-1 inline-block">
            Sign Up
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          {/* First Name */}
          <div className="space-y-1">
            <Input
              {...register("firstName")}
              id="firstName"
              placeholder="First name"
              disabled={isLoading}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <Input
              {...register("lastName")}
              id="lastName"
              placeholder="Last name"
              disabled={isLoading}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="Email ID"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="space-y-1">
            <Input
              {...register("mobile")}
              id="mobile"
              placeholder="Mobile number"
              disabled={isLoading}
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs">{errors.mobile.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="pr-10"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                className="mt-1"
                checked={agreeToTerms}
                onCheckedChange={(checked) =>
                  setValue("agreeToTerms", checked as boolean)
                }
                disabled={isLoading}
              />
              <Label
                htmlFor="terms"
                className="text-xs text-gray-600 leading-relaxed cursor-pointer"
              >
                By selecting the checkbox, you confirm that you agree to the
                collection, processing, and sharing of your personal data with
                us.
              </Label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs">
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-pink-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
