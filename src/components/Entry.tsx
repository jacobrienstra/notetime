import * as React from "react";
import { css } from "@emotion/react";

import timeString from "../util";

const timeStringStyle = css`
  color: var(--blue);
  font-family: monospace;
  font-size: 18px;
  z-index: 100;
`;

const textStyle = css`
  color: black;
  font-family: serif;
  font-size: 18px;
  padding: 6px 0px;
  z-index: 100;
`;

const entryStyle = css`
  background: var(--grey);
  padding: 6px 8px;
  border-radius: 4px;
  margin: 4px 0;
  width: 100%;
  cursor: text;
  user-select: text;
`;

export type EntryProps = {
  time: number;
  text: string;
  key: string;
};

function Entry({ time, text }: EntryProps): JSX.Element {
  return (
    <div css={entryStyle}>
      <span css={timeStringStyle}>[{timeString(time)}] - </span>
      <span css={textStyle}>{text}</span>
    </div>
  );
}

export default Entry;
