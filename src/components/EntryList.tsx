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
  width: 400px;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
  font-size: 18px;

  button {
    display: inline-block;
  }

  svg {
    margin-right: 0.5em;
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
    <div>
      {entries.length > 0 && (
        <div css={buttonWrapper}>
          <button type="button" onClick={copy}>
            <FontAwesomeIcon icon={faClipboard as IconProp} size="1x" />
            Copy Entries
          </button>
          <button type="button" onClick={clear}>
            <FontAwesomeIcon icon={faTrashCan as IconProp} size="1x" />
            Clear Entries
          </button>
        </div>
      )}
      <div className="entries" css={entriesStyle}>
        {entries.map((e) => (
          <Entry {...e} key={e.key} />
        ))}
      </div>
    </div>
  );
}

export default EntryList;
