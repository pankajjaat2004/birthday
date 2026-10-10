import { useEffect, useRef, useState } from "react";

import { Photo } from "@/components/birthday/decor";
import { getBirthdayMusic } from "@/lib/birthday-audio";
import { MEMORIES, VOICE_NOTE } from "@/lib/birthday-content";

export function meta() {
  return [{ title: "A message from me" }];
}

const SLIDE_MS = 4500;

export default function VoiceRoute() {
  const [index, setIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    getBirthdayMusic()?.pause();
    const audio = audioRef.current;
    const gestures = ["pointerdown", "keydown", "touchstart"] as const;
    const removeGestureListeners = () =>
      gestures.forEach((g) => window.removeEventListener(g, start));
    function start() {
      audio?.play().then(removeGestureListeners).catch(() => {});
    }
    gestures.forEach((g) => window.addEventListener(g, start));
    start();
    const id = setInterval(
      () => setIndex((i) => (i + 1) % MEMORIES.length),
      SLIDE_MS,
    );
    return () => {
      clearInterval(id);
      removeGestureListeners();
    };
  }, []);

  const memory = MEMORIES[index];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-50 p-6 text-center">
      <audio ref={audioRef} src={VOICE_NOTE} preload="auto" />

      <h1 className="font-serif text-4xl text-rose-700">
        Happy Birthday, my love
      </h1>

      <div className="flex flex-col items-center gap-5">
        <Photo
          key={memory.src}
          src={memory.src}
          alt={memory.title}
          className="h-72 w-[min(86vw,460px)] rounded-3xl border-8 border-white shadow-2xl animate-[bday-pop-in_0.8s_ease-out]"
        />
        <div key={`text-${index}`} className="max-w-md space-y-1 animate-[bday-fade-up_0.8s_ease-out]">
          <h2 className="font-serif text-2xl text-rose-700">{memory.title}</h2>
          <p className="text-stone-600">{memory.text}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {MEMORIES.map((m, i) => (
          <span
            key={m.src}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-rose-400" : "w-2 bg-pink-200"
            }`}
          />
        ))}
      </div>

      <p className="max-w-lg font-serif text-lg leading-relaxed text-rose-800">
        I am so blessed that you came into my life. Thank you for every
        memory, and for being the most beautiful part of mine.
      </p>
    </div>
  );
}
