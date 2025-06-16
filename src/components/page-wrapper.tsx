import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  titleChildren?: ReactNode;
};

function PageWrapper({ children, className }: PageProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-6",
        "max-w-md mx-auto", // Mobile default max-width with auto horizontal centering
        "sm:max-w-lg", // Small screen ~640px and up
        "md:max-w-4xl", // Medium screen ~768px and up - typical desktop breakpoint
        "lg:max-w-6xl", // Large screen ~1024px and up
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
