import "./globals.css";
import type { Metadata } from "next";
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
      <body className="bg-[#f6f1e6] text-neutral-900">
        <TopNav />
        <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
        <footer className="border-t border-neutral-200 bg-[#fff7ea]">
          <div className="mx-auto w-full max-w-6xl px-6 py-10 text-sm text-neutral-600">
            Automotive content by GaadiCharcha
          </div>
        </footer>
      </body>
    </html>
  );
}
