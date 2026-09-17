import { useContext } from "react";
import { CursorContext } from "./cursorState";

export const useCursor = () => useContext(CursorContext);
