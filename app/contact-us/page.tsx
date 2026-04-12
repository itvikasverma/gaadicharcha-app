import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact GaadiCharcha for editorial feedback, partnership inquiries, and general support.",
  alternates: {
    canonical: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
        Contact Us
      </h1>
      <div className="max-w-3xl space-y-4 text-base leading-relaxed text-neutral-700">
        <p>
          For feedback, corrections, partnership discussions, or other queries,
          please reach out to us at:
        </p>
        <p>
          <a
            href="mailto:vermavikas0880@gmail.com"
            className="font-semibold text-[#2c6f6a] underline-offset-4 hover:underline"
          >
            vermavikas0880@gmail.com
          </a>
        </p>
        <p>We try to respond as quickly as possible.</p>
      </div>
    </section>
  );
}
