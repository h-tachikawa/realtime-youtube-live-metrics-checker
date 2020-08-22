import { createGlobalState } from "react-hooks-global-state";

interface State {
  notifier: {
    type: "none" | "info" | "error",
    text?: string | null,
  }
}

const initialState = {
  notifier: { type: "none" }
} as const;

export const { useGlobalState } = createGlobalState<State>(initialState);