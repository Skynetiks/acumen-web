import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  className?: string;
};

function Page({ children, className }: PageProps) {
  return (
    <main className={cn("min-h-screen h-full w-full grid", className)}>
      {children}
    </main>
  );
}

export default Page;
