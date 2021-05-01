import { atom } from "recoil";

interface Notifier {
  type: "none" | "info" | "error",
  text?: string | null,
}

export const notifierState = atom<Notifier>({
  key: "notifierState",
  default: {
    type: "none"
  },
});
