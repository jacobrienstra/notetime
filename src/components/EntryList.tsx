import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faClipboard, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import timeString from "../util";
import { RootState } from "../redux/store";
import { clearEntries } from "../redux/reducers/entries";

import Entry from "./Entry";

const entriesList = (reverseOrder: boolean) => css`
  display: flex;
  gap: 8px;
  align-content: stretch;
  align-items: stretch;
  min-width: 100%;
  max-width: fit-content;
  margin: 0;

  list-style-position: initial;
  list-style-type: none;
  padding-inline-start: 0;
  flex-direction: ${reverseOrder ? "column-reverse" : "column"};
`;

const entriesSectionTitle = css`
  align-self: flex-start;
  margin: 24px 0 4px 0;

  font-size: 24px;
`;

const entryButtons = css`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-self: stretch;
  justify-content: center;
  margin-bottom: 16px;

  font-size: 16px;

  button {
    flex: 1 1 50%;
    padding: 0.5em 1em;
    position: relative;

    svg {
      font-size: 24px;
    }
    span {
      margin-left: 0.5em;
    }

    #copy-confirm {
      position: absolute;
      top: 0;
      transform: translateY(-100%);
      opacity: 0;
      transition: opacity 0.5s ease-in-out 0s, transform 0.2s ease-in-out 0.5s;

      &.active {
        transform: translateY(-300%);
        opacity: 1;
        transition: all 0.5s;
      }
    }

    &.clear-button {
      :hover {
        border-color: var(--red-500);
      }
      :active {
        border-color: var(--red-800);
      }
    }
  }
`;

function EntryList(): JSX.Element {
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries.list);
  const reverseOrder = useSelector(
    (state: RootState) => state.settings.reverseOrder
  );
  const copiedRef = useRef<HTMLSpanElement>(null);

  const clear = () => {
    dispatch(clearEntries());
  };

  const copy = () => {
    const entriesText = entries
      .map((e) => `[${timeString(e.time)}] - ${e.text}`)
      .join("\n");
    navigator.clipboard
      .writeText(entriesText)
      .then(() => {
        if (entriesText !== "" && copiedRef.current != null) {
          copiedRef.current.textContent = "Copied!";
          copiedRef.current?.classList.add("active");
          setTimeout(() => {
            copiedRef.current?.classList.remove("active");
          }, 500);
        }
      })
      .catch(() => {
        if (entriesText !== "" && copiedRef.current != null) {
          copiedRef.current.textContent = "Error :(";
          copiedRef.current?.classList.add("active");
          setTimeout(() => {
            copiedRef.current?.classList.remove("active");
          }, 500);
        }
      });
  };

  return (
    <Fragment>
      <h4 css={entriesSectionTitle}>Entries</h4>
      <div css={entryButtons}>
        <button
          type="button"
          onClick={clear}
          className="clear-button"
          title="Clear all entries"
        >
          <FontAwesomeIcon icon={faTrashCan as IconProp} size="1x" />
          <span>Clear All</span>
        </button>
        <button
          type="button"
          onClick={copy}
          className="copy-button"
          title="Copy all entries"
        >
          <span ref={copiedRef} id="copy-confirm">
            Copied!
          </span>
          <FontAwesomeIcon icon={faClipboard as IconProp} size="1x" />
          <span>Copy All</span>
        </button>
      </div>
      <ul className="entries" css={entriesList(reverseOrder)}>
        {entries.map((e) => (
          <Entry {...e} key={e.key} />
        ))}
      </ul>
    </Fragment>
  );
}

export default EntryList;
