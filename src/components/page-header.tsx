import type { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
  className?: string;
};

function PageHeader({ children, className }: PageHeaderProps) {
  return <div className={className}>{children}</div>;
}

export default PageHeader;
