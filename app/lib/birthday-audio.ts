import { BIRTHDAY_MUSIC } from "@/lib/birthday-content";

let music: HTMLAudioElement | null = null;

export function getBirthdayMusic() {
  if (typeof window === "undefined") return null;
  if (!music) {
    music = new Audio(BIRTHDAY_MUSIC);
    music.loop = true;
    music.volume = 0.5;
  }
  return music;
}
