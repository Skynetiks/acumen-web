import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

function PageTitle({ title, children, className }: PageProps) {
  return title ? (
    <h1 className={cn("text-lg font-semibold", className)}>{title}</h1>
  ) : (
    children
  );
}

export default PageTitle;
