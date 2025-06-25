import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  className?: string;
};

function Page({ children, className }: PageProps) {
  return (
    <main
      className={cn(
        "min-h-[100dvh] h-full w-full min-w-0 flex flex-col",
        className
      )}
    >
      {children}
    </main>
  );
}

export default Page;
