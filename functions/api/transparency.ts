import { onRequestGet as getStats, onRequestOptions as getOptions } from "./donations/transparency.ts";

export const onRequestGet = getStats;
export const onRequestOptions = getOptions;
