import { useSelector } from "react-redux";

import type { RootState } from "./redux/store";

const timeString = (time: number): string => {
  const precision = useSelector((state: RootState) => state.settings.precision);
  const minutes = `${Math.floor((time / 60000) % 60)}`.padStart(2, "0");
  const seconds = `${Math.floor((time / 1000) % 60)}`.padStart(2, "0");
  const tenths = `${Math.round((time / 100) % 10)}`;

  return `${minutes}:${seconds}${precision === 0 ? "" : `.${tenths}`}`;
};

export default timeString;
