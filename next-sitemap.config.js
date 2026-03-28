/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const siteUrl = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.gaadicharcha.in"
).replace(/\/$/, "");

function readJson(fileName) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", fileName), "utf8"),
  );
}

const contentItems = [
  ...readJson("cars.json"),
  ...readJson("bikes.json"),
  ...readJson("blogs.json"),
];

const contentByPath = new Map(contentItems.map((item) => [`/${item.slug}`, item]));

/**
 * Dynamic route example:
 * If blog pages move to /blog/[slug], change the loc below to `/blog/${item.slug}`
 * for blog/news items and update the corresponding Next.js route.
 */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  autoLastmod: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/500", "/_not-found", "/icon.png", "/apple-icon.png"],
  transform: async (config, urlPath) => {
    if (urlPath === "/") {
      return {
        loc: urlPath,
        changefreq: "daily",
        priority: 1,
        lastmod: new Date().toISOString(),
      };
    }

    const item = contentByPath.get(urlPath);

    if (!item) {
      return {
        loc: urlPath,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    return {
      loc: urlPath,
      changefreq: item.type === "blog" || item.type === "news" ? "weekly" : "monthly",
      priority: item.type === "car" || item.type === "bike" ? 0.8 : 0.7,
      lastmod: item.updatedAt || item.date,
    };
  },
  additionalPaths: async (config) => {
    const paths = ["/", ...contentItems.map((item) => `/${item.slug}`)];
    return Promise.all(paths.map((urlPath) => config.transform(config, urlPath)));
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
