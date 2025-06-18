"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ApplicationSuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 text-center w-full">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-white" />
      </div>

      {/* Success Message */}
      <p className="text-primary text-xl font-medium text-center">
        Thank you! We've received your application and will be in touch soon.
      </p>

      {/* Continue Button */}
      <Button asChild className="w-max">
        <Link to="/application">Continue</Link>
      </Button>
    </div>
  );
}
