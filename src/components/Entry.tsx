import { css } from "@emotion/react";

import timeString from "../util";

const timeStringStyle = css`
  color: var(--blue);
  font-size: 18px;
  font-family: monospace;
`;

const textStyle = css`
  padding: 8px 0;

  font-size: 18px;
  font-family: serif;
  line-height: 1.3;
`;

const entryStyle = css`
  width: 100%;
  padding: 8px;

  background: var(--slate-200);
  border-radius: 4px;
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
