import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for GaadiCharcha explaining information collection, usage, cookies, and user rights.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
        Privacy Policy
      </h1>
      <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-700 md:text-base">
        <p>
          This Privacy Policy describes how GaadiCharcha collects, uses, and
          protects information when you visit our website.
        </p>
        <p>
          We may collect basic analytics data, browser information, and
          interaction details to improve content quality and site performance.
        </p>
        <p>
          Third-party services, including advertising partners such as Google,
          may use cookies to serve relevant ads and measure ad performance.
        </p>
        <p>
          By using this site, you agree to this policy. For privacy concerns,
          contact us at vermavikas0880@gmail.com
.
        </p>
      </div>
    </section>
  );
}
