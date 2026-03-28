"use client";

import { useMemo, useState } from "react";
import type { ContentItem } from "../lib/content";
import ContentCard from "./ContentCard";

type Props = {
  initialItems: ContentItem[];
  remainingItems: ContentItem[];
  batchSize?: number;
  query?: string;
};

export default function LoadMoreGrid({
  initialItems,
  remainingItems,
  batchSize = 6,
  query,
}: Props) {
  const [count, setCount] = useState(batchSize);
  const [isLoading, setIsLoading] = useState(false);

  const visibleItems = useMemo(() => {
    const extra = remainingItems.slice(0, count);
    return [...initialItems, ...extra];
  }, [initialItems, remainingItems, count]);

  const hasMore = count < remainingItems.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCount((prev) => Math.min(prev + batchSize, remainingItems.length));
      setIsLoading(false);
    }, 250);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <div
            key={item.slug}
            className={
              index >= initialItems.length
                ? "animate-[fade-in_0.4s_ease]"
                : ""
            }
          >
            <ContentCard item={item} query={query} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={isLoading}
            className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-neutral-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}