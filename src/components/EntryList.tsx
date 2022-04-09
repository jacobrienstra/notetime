import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import timeString from "../util";
import { RootState } from "../redux/store";
import { clearEntries } from "../redux/reducers/entries";

import Entry from "./Entry";

const entriesStyle = css`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  align-items: stretch;
  max-width: 500px;
  min-width: 100%;
  gap: 8px;
`;

const entriesSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  width: 100%;
  font-size: 14px;

  button {
    display: inline-block;
  }

  svg {
    margin-right: 0.5em;
  }
`;

// const copyButton = css`
//   border-color: var(--cyan-600);

//   :hover {
//     border-color: var(--cyan-700);
//   }
//   :active {
//     border-color: var(--cyan-900);
//   }
// `;

const clearButton = css`
  :hover {
    border-color: var(--red-500);
  }
  :active {
    border-color: var(--red-800);
  }
`;

function EntryList(): JSX.Element {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries.list);

  const clear = () => {
    dispatch(clearEntries());
  };

  const copy = () => {
    const entriesText = entries.map(
      (e) => `[${timeString(e.time)}] - ${e.text}`
    );
    navigator.clipboard.writeText(entriesText.join(""));
  };

  return (
    <div css={entriesSection}>
      {/* {entries.length > 0 && ( */}
      <div css={buttonWrapper}>
        <button type="button" onClick={copy}>
          <FontAwesomeIcon icon={faClipboard as IconProp} size="1x" />
          Copy Entries
        </button>
        <button type="button" onClick={clear} css={clearButton}>
          <FontAwesomeIcon icon={faTrashCan as IconProp} size="1x" />
          Clear Entries
        </button>
      </div>

      <div className="entries" css={entriesStyle}>
        {entries.map((e) => (
          <Entry {...e} key={e.key} />
        ))}
      </div>
    </div>
  );
}

export default EntryList;
