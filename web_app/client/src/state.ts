import { createGlobalState } from "react-hooks-global-state";

interface State {
  notifier: {
    type: "none" | "info" | "error",
    text: string,
  }
}

const initialState = {
  notifier: { type: "none", text: "" }
} as const;

export const { useGlobalState } = createGlobalState<State>(initialState);