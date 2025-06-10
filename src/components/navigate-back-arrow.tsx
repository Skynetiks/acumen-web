import type { FileRouteTypes } from "@/routeTree.gen";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type NavigateBackArrowProps = {
  to: FileRouteTypes["to"];
  className?: string;
};

function NavigateBackArrow({ className, to }: NavigateBackArrowProps) {
  return (
    <Link to={to} className={className}>
      <ArrowLeft strokeWidth={3} size={26} className="text-primary" />
    </Link>
  );
}

export default NavigateBackArrow;
