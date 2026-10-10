import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IconBackspace } from "@tabler/icons-react";

import { Photo } from "@/components/birthday/decor";
import { getBirthdayMusic } from "@/lib/birthday-audio";
import {
  PASSWORD,
  PASSWORD_HINT,
  PASSWORD_LENGTH,
  SURPRISE_PHOTO,
} from "@/lib/birthday-content";

export function meta() {
  return [{ title: "Enter the password" }];
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "back"];

export default function PasswordRoute() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState("");
  const [wrong, setWrong] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function check(value: string) {
    if (value === PASSWORD) {
      getBirthdayMusic()?.play().catch(() => {});
      setUnlocked(true);
      setTimeout(() => navigate("/letter"), 2000);
      return;
    }
    setWrong(true);
    setShowHint(true);
    setTimeout(() => {
      setDigits("");
      setWrong(false);
    }, 900);
  }

  function press(key: string) {
    if (unlocked || wrong) return;
    if (key === "back") {
      setDigits((d) => d.slice(0, -1));
      return;
    }
    if (digits.length >= PASSWORD_LENGTH) return;
    const next = digits + key;
    setDigits(next);
    if (next.length === PASSWORD_LENGTH) check(next);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === "Backspace") press("back");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-50 lg:grid-cols-2">
      <section className="flex items-center justify-center p-8">
        <div className="relative flex h-80 w-80 items-center justify-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fa298068d661e43fdb45effc9440c6145%2F1f3787ad315c4c8a97a764ae36759970?format=webp&width=800&height=1200"
            alt="Heart-shaped gift box"
            className={`absolute inset-0 h-full w-full object-contain text-[20px] drop-shadow-xl transition-all duration-700 ${
              unlocked ? "scale-75 opacity-0" : ""
            }`}
          />
          {unlocked && (
            <Photo
              src={SURPRISE_PHOTO}
              alt="A surprise for you"
              className="absolute h-72 w-56 rounded-2xl border-8 border-white shadow-2xl animate-[bday-pop-in_0.8s_ease-out_forwards]"
            />
          )}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-6 p-8">
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl text-rose-700">
            Enter the secret code
          </h1>
          <p className="text-rose-400">Only the right code opens this gift.</p>
        </div>

        <div
          className={`flex gap-4 ${wrong ? "animate-[bday-shake_0.4s_ease-in-out]" : ""}`}
        >
          {Array.from({ length: PASSWORD_LENGTH }, (_, i) => (
            <span
              key={i}
              className={`h-4 w-4 rounded-full border-2 border-rose-400 ${
                i < digits.length ? "bg-rose-400" : "bg-white"
              }`}
            />
          ))}
        </div>

        <div className="h-6 text-center text-sm text-rose-600">
          {wrong && "That's not it, try again."}
          {!wrong && showHint && !unlocked && `Hint: ${PASSWORD_HINT}`}
          {unlocked && "Opening..."}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {KEYS.map((key, i) =>
            key === "" ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                type="button"
                onClick={() => press(key)}
                disabled={unlocked}
                aria-label={key === "back" ? "Delete" : key}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl font-semibold text-rose-600 shadow-md transition hover:bg-pink-50 active:scale-95 disabled:opacity-60"
              >
                {key === "back" ? <IconBackspace className="h-6 w-6" /> : key}
              </button>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
