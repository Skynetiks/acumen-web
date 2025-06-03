import { ChevronRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";

const buttonVariants = cva(
  " p-4 w-full cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs [&_svg]:text-background hover:bg-primary/90",

        secondary:
          "bg-background border text-foreground shadow-xs [&_svg]:text-primary hover:bg-secondary/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function ArrowButton({
  className,
  title,
  description,
  variant,
  ...props
}: LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    title: string;
    description?: string;
  }) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, className }),
        "flex justify-between items-center gap-4"
      )}
      {...props}
    >
      <div className="text-left">
        <p className="text-base">{title}</p>
        <p className="text-xs">{description}</p>
      </div>
      <ChevronRight className="size-6 drop-shadow-xl/50" strokeWidth={4} />
    </Link>
  );
}

export { ArrowButton, buttonVariants };
