import "./globals.css";
import type { Metadata } from "next";
import TopNav from "../components/TopNav";

export const metadata: Metadata = {
  title: "GaadiCharcha",
  description: "Automotive reviews, comparisons, and news.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
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
