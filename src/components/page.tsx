import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  className?: string;
};

function Page({ children, className }: PageProps) {
  return <div className={cn("min-h-screen grid", className)}>{children}</div>;
}

export default Page;
