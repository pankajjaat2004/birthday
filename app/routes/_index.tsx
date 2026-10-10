import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IconGift } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Cake,
  FloatingHearts,
  GiftBox,
  PartyPoppers,
} from "@/components/birthday/decor";

export function meta() {
  return [{ title: "Happy Birthday Muskan" }];
}

type Stage = "gift" | "opening" | "cake" | "blown";

export default function HomeRoute() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("gift");

  useEffect(() => {
    if (stage === "opening") {
      const id = setTimeout(() => setStage("cake"), 900);
      return () => clearTimeout(id);
    }
    if (stage === "blown") {
      const id = setTimeout(() => navigate("/bokeh"), 3500);
      return () => clearTimeout(id);
    }
  }, [stage, navigate]);

  const blown = stage === "blown";

  return (
    <div className="isolate relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-50 p-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-3xl" />
      <FloatingHearts />
      {stage === "gift" || stage === "opening" ? (
        <>
          <button
            type="button"
            onClick={() => setStage("opening")}
            disabled={stage === "opening"}
            aria-label="Open the gift"
            className="group transition hover:-rotate-2 hover:scale-105 disabled:cursor-default"
          >
            <GiftBox opening={stage === "opening"} />
          </button>
          <div className="space-y-3">
            <h1 className="font-serif text-4xl text-rose-700">
              A little surprise for you, baby
            </h1>
            <p className="text-rose-400">Tap the gift to open it.</p>
          </div>
          <Button
            onClick={() => setStage("opening")}
            disabled={stage === "opening"}
            className="rounded-full bg-gradient-to-r from-rose-400 to-pink-500 px-10 py-7 text-lg text-white shadow-lg shadow-rose-300/60 transition hover:scale-105 hover:from-rose-500 hover:to-pink-600 active:scale-95"
          >
            <IconGift className="mr-2 h-6 w-6" />
            Open my gift
          </Button>
        </>
      ) : (
        <>
          <div className="max-w-xl space-y-3">
            <h1 className="font-serif text-4xl text-rose-700">
              Happy Birthday, Muskan!
            </h1>
            <p className="text-rose-400">
              {blown ? "Your wish is on its way..." : "Make a wish and blow out the candles."}
            </p>
          </div>
          <Cake lit={!blown} />
          {!blown && (
            <Button
              onClick={() => setStage("blown")}
              className="rounded-full bg-gradient-to-r from-rose-400 to-pink-500 px-10 py-6 text-lg text-white shadow-lg shadow-rose-300/60 transition hover:scale-105 active:scale-95"
            >
              Blow
            </Button>
          )}
          {blown && (
            <>
              <PartyPoppers />
            </>
          )}
        </>
      )}
    </div>
  );
}
