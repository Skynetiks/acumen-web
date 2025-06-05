"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
type ToggleProps = React.ComponentPropsWithRef<typeof Toggle>;
export const CustomToggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed, ...props }, ref) => {
    return (
      <Toggle
        ref={ref}
        pressed={pressed}
        variant={"outline"}
        className={cn(
          " py-2 h-[unset] cursor-pointer",
          className,
          pressed
            ? "!text-primary border-primary !bg-transparent"
            : "hover:bg-transparent text-foreground hover:text-foreground"
        )}
        {...props}
      />
    );
  }
);

CustomToggle.displayName = "CustomToggle";
