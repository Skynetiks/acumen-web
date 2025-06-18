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
        "self-center justify-self-center",
        "w-full h-full flex flex-col gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
