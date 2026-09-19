import { useSyncExternalStore } from "react";
import { cursorStore } from "./cursorState";
import type { CursorType } from "./cursorState";

// Stable methods for all page components. Calling setCursor/resetCursor never triggers a re-render!
const stableCursorActions = {
  setCursor: cursorStore.setCursor,
  resetCursor: cursorStore.resetCursor,
  get cursorType(): CursorType {
    return cursorStore.getSnapshot().cursorType;
  },
  get cursorText(): string {
    return cursorStore.getSnapshot().cursorText;
  }
};

export const useCursor = () => stableCursorActions;

// Dedicated reactive hook for CustomCursor component that needs to animate on type/text changes
export const useCursorState = () => {
  return useSyncExternalStore(cursorStore.subscribe, cursorStore.getSnapshot, cursorStore.getSnapshot);
};
