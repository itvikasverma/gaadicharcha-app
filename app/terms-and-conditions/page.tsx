import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing the use of GaadiCharcha content and services.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
        Terms & Conditions
      </h1>
      <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base">
        <p>
          By accessing GaadiCharcha, you agree to use this website lawfully and
          in accordance with these terms.
        </p>
        <p>
          Content is provided for general informational purposes. While we
          strive for accuracy, vehicle specs, prices, and availability can
          change and should be independently verified.
        </p>
        <p>
          Unauthorized reproduction, redistribution, or misuse of content is
          prohibited without prior written permission.
        </p>
        <p>
          We may update these terms at any time. Continued use of the website
          implies acceptance of the latest version.
        </p>
      </div>
    </section>
  );
}
