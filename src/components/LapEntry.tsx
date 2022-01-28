import { useSelector, useDispatch } from "react-redux";
import React, {
  KeyboardEventHandler,
  KeyboardEvent,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import { css } from "@emotion/react";

import timeString from "../util";
import { RootState } from "../redux/store";
import { setLapTime, resetText, setText } from "../redux/reducers/main";
import { addEntry } from "../redux/reducers/entries";

import { EntryProps } from "./Entry";

const curEntryStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  margin: 24px 0;
`;

const textEntry = css`
  padding: 6px;
  font-size: 18px;
  resize: none;
  font-family: serif;
`;

const timeStamp = css`
  font-family: monospace;
  font-size: 24px;
`;

function LapEntry(): JSX.Element {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.main.time);
  const lapTime = useSelector((state: RootState) => state.main.lapTime);
  const text = useSelector((state: RootState) => state.main.text);

  const handleOnKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (text.trim() === "" && e.key.length === 1) {
      dispatch(setLapTime(time));
    }
  };

  const handleOnKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim() !== "") {
        const entry: EntryProps = {
          time: lapTime,
          text,
          key: Date.toString(),
        };
        dispatch(addEntry(entry));
      }
      dispatch(resetText());
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setText(event.target.value));
  };
  return (
    <div className="currentEntry" css={curEntryStyle}>
      <div css={timeStamp}>{timeString(lapTime)}</div>
      <textarea
        cols={36}
        rows={3}
        value={text}
        onKeyUp={handleOnKeyUp}
        onKeyDown={handleOnKeyDown}
        onChange={handleChange}
        css={textEntry}
      />
    </div>
  );
}

export default LapEntry;
