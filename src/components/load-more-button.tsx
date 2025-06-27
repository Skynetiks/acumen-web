// src/components/load-more-trigger.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LoadMoreTriggerProps = {
  loadMoreRef: React.Ref<HTMLDivElement>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement>;

export function LoadMoreTrigger({
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  onClick,
  className,
  ...props
}: LoadMoreTriggerProps) {
  if (!hasNextPage) return null;

  return (
    <div
      ref={loadMoreRef}
      className={cn("flex flex-col items-center space-y-2 py-4", className)}
      {...props}
    >
      {isFetchingNextPage && (
        <p className="text-sm text-muted-foreground">Loading more...</p>
      )}

      {!isFetchingNextPage && (
        <Button onClick={onClick} variant="outline">
          Load More
        </Button>
      )}
    </div>
  );
}
