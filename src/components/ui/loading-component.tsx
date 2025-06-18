import { cn } from "@/lib/utils"; // Tailwind merge util
import { Loader2 } from "lucide-react"; // Or replace with your own logo/icon

type LoadingScreenProps = {
  text?: string;
  className?: string;
};

export function LoadingScreen({
  text = "Loading...",
  className,
}: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full items-center justify-center text-center p-6 rounded-lg bg-muted",
        className
      )}
    >
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
