import cars from "../data/cars.json";
import bikes from "../data/bikes.json";
import blogs from "../data/blogs.json";

export type ContentType =
  | "car"
  | "bike"
  | "news"
  | "comparison"
  | "review"
  | "blog";

export type ContentSection = {
  heading: string;
  body: string[];
  cards?: {
    name: string;
    image: string;
    description?: string;
  }[];
};

export type ContentItem = {
  slug: string;
  type: ContentType;
  title: string;
  image: string;
  description: string;
  content?: string[];
  sections?: ContentSection[];
  tags?: string[];
  date: string;
  updatedAt?: string;
  specs?: {
    price: string;
    mileage: string;
    engine: string;
  };
  pros?: string[];
  cons?: string[];
  comparison?: null | {
    vs: string;
    verdict: string;
  };
};

const items = [
  ...(cars as ContentItem[]),
  ...(bikes as ContentItem[]),
  ...(blogs as ContentItem[]),
].sort((a, b) => {
  const aTime = Date.parse(a.updatedAt ?? a.date);
  const bTime = Date.parse(b.updatedAt ?? b.date);
  return bTime - aTime;
});

export function getAllContent() {
  return items;
}

export function getAllSlugs() {
  return items.map((item) => ({ slug: item.slug }));
}

export function getContentBySlug(slug: string) {
  return items.find((item) => item.slug === slug);
}

export function buildSchema(item: ContentItem) {
  const isReview = item.type === "car" || item.type === "bike" || item.type === "review";
  const base = {
    "@context": "https://schema.org",
    "@type": isReview ? "Review" : "Article",
    headline: item.title,
    image: [item.image],
    description: item.description,
    datePublished: item.date,
  } as Record<string, unknown>;

  if (isReview) {
    base.itemReviewed = {
      "@type": "Vehicle",
      name: item.title,
    };
  }

  return base;
}
