import { createContext } from "react";

export type CursorType = "default" | "button" | "link" | "project" | "image" | "input";

export interface CursorState {
  cursorType: CursorType;
  cursorText: string;
}

export interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
}

// Lightweight listener-based pub/sub store for cursor updates.
// This allows components to call setCursor/resetCursor without re-rendering!
// Only CustomCursor subscribes to state changes, eliminating re-renders across the whole website on mouseover.
let currentCursorState: CursorState = {
  cursorType: "default",
  cursorText: ""
};

const cursorListeners = new Set<() => void>();

export const cursorStore = {
  getSnapshot: (): CursorState => currentCursorState,
  subscribe: (listener: () => void) => {
    cursorListeners.add(listener);
    return () => {
      cursorListeners.delete(listener);
    };
  },
  setCursor: (type: CursorType, text = "") => {
    if (currentCursorState.cursorType === type && currentCursorState.cursorText === text) {
      return;
    }
    currentCursorState = { cursorType: type, cursorText: text };
    cursorListeners.forEach((l) => l());
  },
  resetCursor: () => {
    if (currentCursorState.cursorType === "default" && currentCursorState.cursorText === "") {
      return;
    }
    currentCursorState = { cursorType: "default", cursorText: "" };
    cursorListeners.forEach((l) => l());
  }
};

export const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  cursorText: "",
  setCursor: cursorStore.setCursor,
  resetCursor: cursorStore.resetCursor
});
