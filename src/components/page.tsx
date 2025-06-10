import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  className?: string;
};

function Page({ children, className }: PageProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Page;
