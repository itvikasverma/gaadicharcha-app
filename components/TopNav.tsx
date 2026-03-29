"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-neutral-200 bg-[#fff7ea]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border border-neutral-200 bg-white p-1">
            <Image
              src="/site-logo.png"
              alt="GaadiCharcha"
              fill
              className="object-contain"
              sizes="56px"
              priority
            />
          </div>
          <div className="text-lg font-semibold tracking-wide">
            <span className="text-red-600">Gaadi</span>{" "}
            <span className="text-neutral-900">Charcha</span>
          </div>
        </Link>

        <nav className="hidden items-center justify-center gap-6 text-sm font-semibold uppercase tracking-widest text-neutral-700 md:flex">
          <Link className="transition hover:text-[#2c6f6a]" href="/">
            Home
          </Link>
          <Link className="transition hover:text-[#2c6f6a]" href="/?type=car">
            Cars
          </Link>
          <Link className="transition hover:text-[#2c6f6a]" href="/?type=bike">
            Bikes
          </Link>
          <Link className="transition hover:text-[#2c6f6a]" href="/?type=blog">
            Blog
          </Link>
        </nav>

        <div className="hidden justify-end md:flex">
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 shadow-sm transition hover:border-[#2c6f6a] hover:text-[#2c6f6a] md:hidden"
        >
          {open ? (
            <span className="text-xl">×</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-[#fff7ea] md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4">
            <nav className="flex flex-col gap-3 text-sm font-semibold uppercase tracking-widest text-neutral-700">
              <Link className="transition hover:text-[#2c6f6a]" href="/">
                Home
              </Link>
              <Link className="transition hover:text-[#2c6f6a]" href="/?type=car">
                Cars
              </Link>
              <Link className="transition hover:text-[#2c6f6a]" href="/?type=bike">
                Bikes
              </Link>
              <Link className="transition hover:text-[#2c6f6a]" href="/?type=blog">
                Blog
              </Link>
            </nav>
            <Suspense fallback={null}>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      )}
    </header>
  );
}
