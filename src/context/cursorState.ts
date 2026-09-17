import { createContext } from "react";

export type CursorType = "default" | "button" | "link" | "project" | "image" | "input";

export interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
}

export const CursorContext = createContext<CursorContextType>({
  cursorType: "default",
  cursorText: "",
  setCursor: () => {},
  resetCursor: () => {}
});
