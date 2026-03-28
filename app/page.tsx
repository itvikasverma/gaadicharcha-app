import Link from "next/link";
import type { Metadata } from "next";
import LoadMoreGrid from "../components/LoadMoreGrid";
import { getAllContent } from "../lib/content";
import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, SITE_NAME } from "../lib/site";

export const dynamic = "force-dynamic";

const INITIAL_COUNT = 15;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const active = params.type ?? "all";
  const query = (params.q ?? "").trim();

  const titleByType: Record<string, string> = {
    all: SITE_NAME,
    car: "Car Reviews",
    bike: "Bike Reviews",
    blog: "Auto Blog and News",
  };

  const title = query
    ? `${titleByType[active] ?? SITE_NAME} Search: ${query}`
    : titleByType[active] ?? SITE_NAME;

  const description = query
    ? `Search results on GaadiCharcha for "${query}" across car reviews, bike reviews, comparisons, and automotive news.`
    : DEFAULT_DESCRIPTION;

  return {
    title,
    description,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: "/",
      type: "website",
    },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const items = getAllContent();
  const params = await searchParams;
  const active = params.type ?? "all";
  const query = (params.q ?? "").trim().toLowerCase();

  const filteredByType =
    active === "all"
      ? items
      : active === "blog"
        ? items.filter((item) => item.type === "blog" || item.type === "news")
        : items.filter((item) => item.type === active);

  const filtered = query
    ? filteredByType.filter((item) => {
        const haystack = `${item.title} ${item.description}`.toLowerCase();
        return haystack.includes(query);
      })
    : filteredByType;

  const initialItems = filtered.slice(0, INITIAL_COUNT);
  const remainingItems = filtered.slice(INITIAL_COUNT);

  const filters = [
    { label: "All Posts", value: "all" },
    { label: "Car Reviews", value: "car" },
    { label: "Bike Reviews", value: "bike" },
    { label: "Blog & News", value: "blog" },
  ];

  return (
    <section className="space-y-10">
      <div className="grid gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          India’s sharpest auto reviews, launches, and comparisons.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-600">
          Clean, original coverage of cars, bikes, and auto trends. Scroll on to
          explore, and load more when you want the next set of stories.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={
              filter.value === "all"
                ? query
                  ? `/?q=${encodeURIComponent(query)}`
                  : "/"
                : query
                  ? `/?type=${filter.value}&q=${encodeURIComponent(query)}`
                  : `/?type=${filter.value}`
            }
            className={
              active === filter.value
                ? "rounded-full bg-[#2c6f6a] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white"
                : "rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-700 transition hover:border-[#2c6f6a] hover:text-[#2c6f6a]"
            }
          >
            {filter.label}
          </Link>
        ))}
        {query && (
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Search: {query}
          </span>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-sm text-neutral-600">
          No posts found. Try a different search.
        </div>
      ) : (
        <LoadMoreGrid
          initialItems={initialItems}
          remainingItems={remainingItems}
          batchSize={6}
          query={query}
        />
      )}
    </section>
  );
}
