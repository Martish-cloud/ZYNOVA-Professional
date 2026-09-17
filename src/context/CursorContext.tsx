import React, { useState } from "react";
import type { ReactNode } from "react";
import { CursorContext } from "./cursorState";
import type { CursorType } from "./cursorState";

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [cursorText, setCursorText] = useState<string>("");

  const setCursor = (type: CursorType, text = "") => {
    setCursorType(type);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorType("default");
    setCursorText("");
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};
