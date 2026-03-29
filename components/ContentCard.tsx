import Image from "next/image";
import Link from "next/link";
import type { ContentItem } from "../lib/content";

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightTitle(title: string, query?: string) {
  if (!query) {
    return title;
  }

  const safe = escapeRegex(query.trim());
  if (!safe) {
    return title;
  }

  const regex = new RegExp(`(${safe})`, "ig");
  const parts = title.split(regex);
  const lower = query.toLowerCase();

  return parts.map((part, index) =>
    part.toLowerCase() === lower ? (
      <mark
        key={`${part}-${index}`}
        className="rounded bg-amber-300/70 px-1 text-neutral-900"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

export default function ContentCard({
  item,
  query,
}: {
  item: ContentItem;
  query?: string;
}) {
  return (
    <Link
      href={`/${item.slug}`}
      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full bg-neutral-50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-800 shadow">
          {formatDate(item.date)}
        </div>
      </div>
      <div className="space-y-2 px-4 pb-4 pt-3">
        <p className="text-xs uppercase tracking-widest text-neutral-500">
          {item.type}
        </p>
        <h3 className="text-base font-semibold leading-snug text-neutral-900 md:text-lg">
          {highlightTitle(item.title, query)}
        </h3>
      </div>
    </Link>
  );
}
