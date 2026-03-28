"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [value, setValue] = useState(initialQ);

  useEffect(() => {
    setValue(initialQ);
  }, [initialQ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = new URLSearchParams(params.toString());
    const trimmed = value.trim();

    if (trimmed) {
      next.set("q", trimmed);
    } else {
      next.delete("q");
    }

    const query = next.toString();
    router.push(query ? `/?${query}` : "/");
  };

  const handleClear = () => {
    setValue("");
    router.replace("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xs items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-2 shadow-sm"
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
        Search
      </span>
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;
          setValue(nextValue);
          if (!nextValue.trim() && params.get("q")) {
            handleClear();
          }
        }}
        placeholder="Search reviews, bikes..."
        className="w-full bg-transparent text-sm text-neutral-700 outline-none"
      />
    </form>
  );
}
