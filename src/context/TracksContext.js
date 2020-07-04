import { createContext } from "react";

function noop() {}

export const TracksContext = createContext({
  tracks: null,
  heading: null,
  dispatch: noop,
});
