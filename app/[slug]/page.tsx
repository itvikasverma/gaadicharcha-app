import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildSchema, getAllSlugs, getContentBySlug } from "../../lib/content";

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) {
    return { title: "Not found" };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      images: [item.image],
    },
  };
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getContentBySlug(slug);

  if (!item) {
    notFound();
  }

  const schema = buildSchema(item);
  const showFullContent =
    item.type === "car" ||
    item.type === "bike" ||
    item.type === "blog" ||
    item.type === "news";

  return (
    <article className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#2c6f6a]">
          {item.type}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          {item.title}
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-neutral-600">
          {item.description}
        </p>
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1100px"
            priority
          />
        </div>
      </div>

      {showFullContent && item.content && item.content.length > 0 && (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Overview</h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-neutral-700">
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {item.sections && item.sections.length > 0 && (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            {item.sections.map((section) => (
              <div key={section.heading} className="space-y-2">
                <h2 className="text-lg font-semibold text-neutral-900">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-base leading-relaxed text-neutral-700">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.cards && section.cards.length > 0 && (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.cards.map((car) => (
                      <div
                        key={`${section.heading}-${car.name}`}
                        className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        <div className="space-y-1 p-3">
                          <h3 className="text-sm font-semibold text-neutral-900">
                            {car.name}
                          </h3>
                          {car.description && (
                            <p className="text-sm leading-relaxed text-neutral-600">
                              {car.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {item.specs && (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Specifications</h2>
          <dl className="mt-4 grid gap-4 text-sm text-neutral-700 sm:grid-cols-3">
            <div>
              <dt className="uppercase tracking-widest text-neutral-400">Price</dt>
              <dd className="mt-1 text-base font-semibold text-neutral-900">
                {item.specs.price}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-neutral-400">Mileage</dt>
              <dd className="mt-1 text-base font-semibold text-neutral-900">
                {item.specs.mileage}
              </dd>
            </div>
            <div>
              <dt className="uppercase tracking-widest text-neutral-400">Engine</dt>
              <dd className="mt-1 text-base font-semibold text-neutral-900">
                {item.specs.engine}
              </dd>
            </div>
          </dl>
        </section>
      )}

      {(item.pros || item.cons) && (
        <section className="grid gap-6 md:grid-cols-2">
          {item.pros && item.pros.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">Pros</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.pros.map((pro) => (
                  <span
                    key={pro}
                    className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                  >
                    {pro}
                  </span>
                ))}
              </div>
            </div>
          )}
          {item.cons && item.cons.length > 0 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">Cons</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.cons.map((con) => (
                  <span
                    key={con}
                    className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-700"
                  >
                    {con}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {item.comparison && (
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Comparison</h2>
          <p className="mt-2 text-base text-neutral-600">
            Against <strong>{item.comparison.vs}</strong>: {item.comparison.verdict}
          </p>
        </section>
      )}
    </article>
  );
}
