import { useSelector, useDispatch } from "react-redux";
import {
  KeyboardEventHandler,
  KeyboardEvent,
  ChangeEvent,
  ChangeEventHandler,
  Fragment,
} from "react";
import { css } from "@emotion/react";

import timeString from "../util";
import { RootState } from "../redux/store";
import { setLapTime, resetText, setText } from "../redux/reducers/timer";
import { addEntry } from "../redux/reducers/entries";

import { EntryProps } from "./Entry";

const timeStamp = css`
  align-self: flex-start;

  font-size: 24px;
  font-family: monospace;
  margin-bottom: 6px;
`;

const textEntry = css`
  padding: 6px;

  font-size: 18px;
  font-family: serif;

  border-radius: 4px;
  outline-offset: 0px;
  border: 4px solid var(--slate-300);

  resize: all;
  will-change: border-color;

  &:focus-visible {
    border-color: var(--cyan-500);
    outline-color: var(--cyan-500);
    outline-style: hidden;
    outline-width: 1px;
  }
`;

function NoteInput(): JSX.Element {
  const dispatch = useDispatch();
  const time = useSelector((state: RootState) => state.timer.time);
  const lapTime = useSelector((state: RootState) => state.timer.lapTime);
  const text = useSelector((state: RootState) => state.timer.text);

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
    <Fragment>
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
    </Fragment>
  );
}

export default NoteInput;
