import { css } from "@emotion/react";

import timeString from "../util";

const timeStringStyle = css`
  color: var(--blue);
  font-family: monospace;
  font-size: 18px;
  z-index: 100;
`;

const textStyle = css`
  font-family: serif;
  font-size: 18px;
  line-height: 1.3;
  padding: 8px 0px;
  z-index: 100;
`;

const entryStyle = css`
  background: var(--slate-200);
  padding: 8px 8px;
  border-radius: 4px;
  width: 100%;
  cursor: text;
  user-select: all;
`;

export type EntryProps = {
  time: number;
  text: string;
  key: string;
};

function Entry({ time, text }: EntryProps): JSX.Element {
  return (
    <li css={entryStyle}>
      <span css={timeStringStyle}>[{timeString(time)}] - </span>
      <span css={textStyle}>{text}</span>
    </li>
  );
}

export default Entry;
