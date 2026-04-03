import cars from "../data/cars.json";
import bikes from "../data/bikes.json";
import blogs from "../data/blogs.json";
import { SITE_NAME, SITE_URL, toAbsoluteUrl } from "./site";

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
  image_2?: string;
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

export function getContentPath(item: Pick<ContentItem, "slug">) {
  return `/${item.slug}`;
}

export function getContentUrl(item: Pick<ContentItem, "slug">) {
  return `${SITE_URL}${getContentPath(item)}`;
}

export function buildSchema(item: ContentItem) {
  const isArticleType = item.type === "blog" || item.type === "news";
  const images = [item.image, item.image_2]
    .filter((image): image is string => Boolean(image))
    .map((image) => toAbsoluteUrl(image));
  const base = {
    "@context": "https://schema.org",
    "@type": isArticleType ? "Article" : "Article",
    headline: item.title,
    url: getContentUrl(item),
    mainEntityOfPage: getContentUrl(item),
    image: images,
    description: item.description,
    datePublished: item.date,
    dateModified: item.updatedAt ?? item.date,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  } as Record<string, unknown>;

  return base;
}
