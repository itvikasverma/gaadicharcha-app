import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about GaadiCharcha, an automotive content platform focused on practical car and bike insights for Indian readers.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
        About Us
      </h1>
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-neutral-700">
        <p>
          GaadiCharcha publishes independent automotive content for Indian
          readers, including reviews, launch updates, comparisons, and buying
          guidance.
        </p>
        <p>
          Our goal is to simplify vehicle decisions with clear writing,
          practical details, and regularly updated information across cars and
          bikes.
        </p>
      </div>
    </section>
  );
}
