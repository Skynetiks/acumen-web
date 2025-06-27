import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils"; // optional: if you use clsx/cn utility

type ErrorComponentProps = {
  title?: string;
  description?: string;
  error?: unknown;
  onRetry?: () => void;
  className?: string;
};

export function ErrorComponent({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  error,
  onRetry,
  className,
}: ErrorComponentProps) {
  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : null;

  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center text-center p-6 rounded-lg border bg-muted",
        className
      )}
    >
      <AlertTriangle className="w-10 h-10 text-destructive mb-4" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {errorMessage && (
        <pre className="bg-destructive/10 text-destructive p-3 mt-4 text-xs rounded-md max-w-full overflow-x-auto">
          {errorMessage}
        </pre>
      )}
      {onRetry && (
        <Button className="mt-6" variant="default" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
