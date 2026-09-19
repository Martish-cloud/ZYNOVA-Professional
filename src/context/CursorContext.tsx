import React from "react";
import type { ReactNode } from "react";
import { CursorContext, cursorStore } from "./cursorState";

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CursorContext.Provider
      value={{
        cursorType: cursorStore.getSnapshot().cursorType,
        cursorText: cursorStore.getSnapshot().cursorText,
        setCursor: cursorStore.setCursor,
        resetCursor: cursorStore.resetCursor
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};
