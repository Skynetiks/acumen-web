import type { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
};

function PageHeader({ children }: PageHeaderProps) {
  return <div className="">{children}</div>;
}

export default PageHeader;
