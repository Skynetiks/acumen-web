"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Logo from "@/components/logo";
import { Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const loginSchema = z.object({
  countryCode: z.string().min(1, "Country code is required"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"mobile" | "email">("mobile");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      countryCode: "in",
      mobile: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      console.log("Login data:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Handle successful login here
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      console.log(`Logging in with ${provider}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`${provider} login successful!`);
    } catch (error) {
      console.error(`${provider} login error:`, error);
      alert(`${provider} login failed. Please try again.`);
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
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-primary">Welcome Back!</h1>
          <p className="text-gray-600 text-sm">
            Continue your journey to study in Japan.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Mobile Number Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-primary font-medium">
                Mobile Number
              </Label>
              <div className="flex">
                <Select
                  defaultValue="in"
                  onValueChange={(value) => setValue("countryCode", value)}
                >
                  <SelectTrigger className="w-24 text-xs rounded-r-none border-r-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in">IN +91</SelectItem>
                    <SelectItem value="us">US +1</SelectItem>
                    <SelectItem value="uk">UK +44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  {...register("mobile")}
                  id="mobile"
                  placeholder="Enter number"
                  className="flex-1 rounded-l-none"
                  disabled={isLoading}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs">{errors.mobile.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                setLoginMethod(loginMethod === "mobile" ? "email" : "mobile")
              }
              className="text-primary text-sm hover:underline"
              disabled={isLoading}
            >
              Login with {loginMethod === "mobile" ? "Email" : "Mobile"}
            </button>
          </div>

          {/* Request OTP Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Request OTP"
            )}
          </Button>
        </form>

        <div className="text-center">
          <Link to="/" className="text-primary text-sm hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center space-x-4">
          <Separator className="flex-1" />
          <span className="text-gray-500 text-sm">or continue with</span>
          <Separator className="flex-1" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border border-border drop-shadow-2xl"
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border border-border drop-shadow-2xl bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => handleSocialLogin("Facebook")}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-full border border-border drop-shadow-2xl"
            onClick={() => handleSocialLogin("Apple")}
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <Link
            to="/auth/signup"
            className="text-primary text-sm hover:underline"
          >
            New here?
          </Link>
          <p className="text-xs text-gray-500 leading-relaxed">
            Sign up to explore top universities, scholarships, and student life
            in Japan.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
