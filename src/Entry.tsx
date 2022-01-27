import * as React from "react";
import { css } from "@emotion/react";

import timeString from "./util";

const timeStringStyle = css`
  color: blue;
  font-family: monospace;
`;

const textStyle = css`
  color: black;
  font-family: serif;
`;

export type EntryProps = {
  time: number;
  text: string;
};

function Entry({ time, text }: EntryProps): JSX.Element {
  return (
    <div>
      <span css={timeStringStyle}>[[{timeString(time)}]] - </span>
      <span css={textStyle}>{text}</span>
    </div>
  );
}

export default Entry;
