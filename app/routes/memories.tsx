import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IconHeart } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Photo } from "@/components/birthday/decor";
import { getBirthdayMusic } from "@/lib/birthday-audio";
import { MEMORIES } from "@/lib/birthday-content";

export function meta() {
  return [{ title: "Our memories" }];
}

export default function MemoriesRoute() {
  const navigate = useNavigate();
  const [suspense, setSuspense] = useState(false);

  useEffect(() => {
    if (!suspense) return;
    const id = setTimeout(() => navigate("/voice"), 3000);
    return () => clearTimeout(id);
  }, [suspense, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-50 px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl text-rose-700">Our Memories</h1>
        <p className="mt-2 text-rose-400">
          Every moment with you is a treasure.
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MEMORIES.map((memory, i) => (
          <article
            key={memory.src}
            className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1"
          >
            <Photo
              src={memory.src}
              alt={memory.title}
              className="aspect-[4/3] w-full"
            />
            <div className="space-y-2 p-5">
              <p className="text-xs font-medium uppercase tracking-widest text-pink-400">
                Memory {i + 1}
              </p>
              <h2 className="font-serif text-xl text-rose-700">
                {memory.title}
              </h2>
              <p className="text-sm leading-relaxed text-stone-600">
                {memory.text}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          onClick={() => {
            getBirthdayMusic()?.pause();
            setSuspense(true);
          }}
          disabled={suspense}
          className="rounded-full bg-rose-400 px-8 py-6 text-base text-white hover:bg-rose-500"
        >
          Next
        </Button>
      </div>

      {suspense && (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-rose-900/90 text-center text-white">
          <IconHeart className="h-16 w-16 fill-pink-300 text-pink-300 animate-[bday-pulse_1s_ease-in-out_infinite]" />
          <p className="font-serif text-2xl">Something special is coming...</p>
        </div>
      )}
    </div>
  );
}
