import { useEffect } from "react";
import { useNavigate } from "react-router";

import { BokehOrb } from "@/components/birthday/decor";

export function meta() {
  return [{ title: "For you, baby" }];
}

export default function BokehRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => navigate("/password"), 5000);
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-pink-100 via-rose-50 to-yellow-50 p-6 text-center">
      <BokehOrb />
      <div className="max-w-xl space-y-3 font-serif">
        <p className="text-3xl text-rose-700">a small present for you baby</p>
        <p className="text-lg text-rose-900">
          i just wanted to see you keep smiling like this always
        </p>
      </div>
    </div>
  );
}
