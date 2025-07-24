// src/hooks/usePaginatedList.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

type UsePaginationProps<TFilters, TItem> = {
  queryKey: any[];
  fetchFn: (opts: { pageParam: number; filters: TFilters }) => Promise<TItem[]>;
  pageSize?: number;
  filters: TFilters;
};

export function usePagination<TFilters, TItem>({
  queryKey,
  fetchFn,
  filters,
  pageSize = 10,
}: UsePaginationProps<TFilters, TItem>) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: [...queryKey, filters],
    queryFn: ({ pageParam = 1 }) => fetchFn({ pageParam, filters }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === pageSize ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const [loadMoreRef, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [entry, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const flatData: TItem[] = data?.pages.flat() ?? [];

  return {
    items: flatData,
    loadMoreRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  };
}
