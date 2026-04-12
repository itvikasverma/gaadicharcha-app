import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "../components/TopNav";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  toAbsoluteUrl,
} from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: toAbsoluteUrl("/site-logo.png"),
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [toAbsoluteUrl("/site-logo.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/site-favicon-circle.svg",
    shortcut: "/site-favicon-circle.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2749037122832439"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-[#f6f1e6] text-neutral-900">
        <TopNav />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        <footer className="border-t border-neutral-200 bg-[#fff7ea]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-neutral-600 md:flex-row md:items-center md:justify-between">
            <p>Automotive content by GaadiCharcha</p>
            <nav className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-widest text-neutral-700">
              <Link className="transition hover:text-[#2c6f6a]" href="/about-us">
                About Us
              </Link>
              <Link className="transition hover:text-[#2c6f6a]" href="/contact-us">
                Contact Us
              </Link>
              <Link
                className="transition hover:text-[#2c6f6a]"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <Link
                className="transition hover:text-[#2c6f6a]"
                href="/terms-and-conditions"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
