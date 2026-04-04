"use client";

import { useState } from "react";
import Image from "next/image";

type PostImageGalleryProps = {
  title: string;
  images: string[];
};

export default function PostImageGallery({
  title,
  images,
}: PostImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-50">
        <Image
          src={images[activeIndex]}
          alt={activeIndex === 0 ? title : `${title} image ${activeIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1100px"
          preload
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label="Show previous image"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-neutral-900 shadow transition hover:bg-white"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Show next image"
              onClick={goToNext}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-neutral-900 shadow transition hover:bg-white"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm">
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeIndex ? "bg-neutral-900" : "bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
