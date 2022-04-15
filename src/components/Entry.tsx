import { css } from "@emotion/react";

import timeString from "../util";

const entryRoot = css`
  width: 100%;
  padding: 8px;

  background: var(--slate-200);
  border-radius: 4px;
  cursor: text;

  user-select: all;

  .entry-text {
    padding: 8px 0;

    font-size: 18px;
    font-family: serif;
    line-height: 1.3;
  }

  .timestamp {
    color: var(--blue);
    font-size: 18px;
  }
`;

export type EntryProps = {
  time: number;
  text: string;
  key: string;
};

function Entry({ time, text }: EntryProps): JSX.Element {
  return (
    <li css={entryRoot}>
      <span className="timestamp">[{timeString(time)}] - </span>
      <span className="entry-text">{text}</span>
    </li>
  );
}

export default Entry;
