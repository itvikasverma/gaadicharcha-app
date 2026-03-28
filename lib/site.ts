export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.gaadicharcha.in";

export const SITE_NAME = "GaadiCharcha";

export const DEFAULT_TITLE = "GaadiCharcha";

export const DEFAULT_DESCRIPTION =
  "GaadiCharcha covers car reviews, bike reviews, launch news, comparisons, and buying advice for Indian automotive shoppers.";

export const DEFAULT_KEYWORDS = [
  "GaadiCharcha",
  "car reviews India",
  "bike reviews India",
  "car launches",
  "bike launches",
  "automotive news",
  "car comparison",
  "buying guide",
];

export function toAbsoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
