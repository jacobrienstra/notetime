import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import timeString from "../util";
import { RootState } from "../redux/store";
import { clearEntries } from "../redux/reducers/entries";

import Entry from "./Entry";

const entriesSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-width: 400px;
`;

const entriesList = (reverseOrder: boolean) => css`
  display: flex;
  flex-direction: ${reverseOrder ? "column-reverse" : "column"};
  align-content: stretch;
  align-items: stretch;
  min-width: 100%;
  max-width: fit-content;
  gap: 8px;
  list-style-type: none;
  list-style-position: initial;
  padding-inline-start: 0;
  margin: 0;
`;

const entriesSectionTitle = css`
  font-size: 24px;
  align-self: flex-start;
`;

const buttons = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  gap: 30px;
  font-size: 16px;
  margin-bottom: 16px;

  button {
    padding: 0.5em 1em;
  }

  span {
    margin-left: 0.5em;
  }

  svg {
    font-size: 24px;
  }
`;

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
  const reverseOrder = useSelector(
    (state: RootState) => state.settings.reverseOrder
  );

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
      <h4 css={entriesSectionTitle}>Entries</h4>
      <div css={buttons}>
        <button type="button" onClick={clear} css={clearButton}>
          <FontAwesomeIcon icon={faTrashCan as IconProp} size="1x" />
          <span>Clear All</span>
        </button>{" "}
        <button type="button" onClick={copy}>
          <FontAwesomeIcon icon={faClipboard as IconProp} size="1x" />
          <span>Copy All</span>
        </button>
      </div>

      <ul className="entries" css={entriesList(reverseOrder)}>
        {entries.map((e) => (
          <Entry {...e} key={e.key} />
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
