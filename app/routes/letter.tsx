import { useState } from "react";
import { useNavigate } from "react-router";
import { IconHeart } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { LOVE_LETTER } from "@/lib/birthday-content";

export function meta() {
  return [{ title: "A letter for you" }];
}

const ENVELOPE_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2Fa298068d661e43fdb45effc9440c6145%2Fd0a3ae9690524f5286f652a833269209?format=webp&width=800&height=1200";

const BACKGROUND_HEARTS = [
  { left: "6%", top: "10%", size: 28, delay: "0s" },
  { left: "18%", top: "70%", size: 18, delay: "1s" },
  { left: "30%", top: "20%", size: 14, delay: "2s" },
  { left: "42%", top: "82%", size: 24, delay: "0.5s" },
  { left: "55%", top: "12%", size: 16, delay: "1.5s" },
  { left: "68%", top: "74%", size: 30, delay: "2.5s" },
  { left: "80%", top: "18%", size: 20, delay: "0.8s" },
  { left: "90%", top: "62%", size: 26, delay: "1.8s" },
  { left: "12%", top: "42%", size: 12, delay: "3s" },
  { left: "86%", top: "90%", size: 16, delay: "2.2s" },
  { left: "50%", top: "50%", size: 12, delay: "0.3s" },
  { left: "74%", top: "44%", size: 14, delay: "1.2s" },
];

type Stage = "sealed" | "opening" | "open";

export default function LetterRoute() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("sealed");

  function openLetter() {
    setStage("opening");
    setTimeout(() => setStage("open"), 700);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-yellow-50 via-pink-50 to-pink-100 p-6">
      {BACKGROUND_HEARTS.map((h, i) => (
        <IconHeart
          key={i}
          className="pointer-events-none absolute fill-pink-300 text-pink-300 opacity-60 animate-[bday-float_4s_ease-in-out_infinite]"
          style={{
            left: h.left,
            top: h.top,
            width: h.size,
            height: h.size,
            animationDelay: h.delay,
          }}
        />
      ))}

      {stage !== "open" ? (
        <div
          className={`flex w-[min(85vw,460px)] flex-col items-center transition-all duration-700 ${
            stage === "opening" ? "scale-95 opacity-0" : ""
          }`}
        >
          <div className="relative w-full">
            <img
              src={ENVELOPE_IMAGE}
              alt="A sealed envelope with a heart"
              className="w-full drop-shadow-2xl"
            />
            <button
              type="button"
              onClick={openLetter}
              disabled={stage === "opening"}
              aria-label="Open the letter"
              className="absolute left-[52%] top-[42%] flex h-[24%] w-[18%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition hover:scale-110 active:scale-95"
            >
              <span className="absolute inset-0 rounded-full ring-4 ring-pink-300/60 animate-[bday-pulse_1.6s_ease-in-out_infinite]" />
            </button>
          </div>
          <p className="mt-6 text-center text-sm text-rose-500">
            Tap the heart to open
          </p>
        </div>
      ) : (
        <div className="relative flex w-[min(92vw,600px)] flex-col items-center gap-8 rounded-2xl border border-pink-200 bg-[radial-gradient(ellipse_at_center,#ffffff_0%,#fff5f8_55%,#fbd5e0_100%)] px-12 py-10 font-serif shadow-2xl animate-[bday-pop-in_0.7s_ease-out_forwards]">
          <IconHeart className="absolute -left-4 -top-4 h-12 w-12 fill-pink-400 text-pink-400 drop-shadow" />
          <IconHeart className="absolute -bottom-4 -right-4 h-14 w-14 fill-pink-400 text-pink-400 drop-shadow" />
          <div
            className="w-full text-[18px] leading-[36px] text-rose-900"
            style={{
              fontFamily:
                "'Segoe Script', 'Brush Script MT', 'Bradley Hand', 'Comic Sans MS', cursive",
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 35px, rgba(120, 60, 80, 0.45) 35px, rgba(120, 60, 80, 0.45) 36px)",
            }}
          >
            {LOVE_LETTER.map((line, i) => (
              <p key={i} className="mb-9">
                {line}
              </p>
            ))}
          </div>
          <Button
            onClick={() => navigate("/memories")}
            className="rounded-full bg-rose-400 px-8 py-5 text-base text-white hover:bg-rose-500"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
