import { useSelector, useDispatch } from "react-redux";
import React, {
  useEffect,
  KeyboardEventHandler,
  KeyboardEvent,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import { css } from "@emotion/react";

import timeString from "./util";
import { RootState } from "./redux/store";
import {
  incTime10,
  setLapTime,
  start,
  pause,
  unpause,
  stop,
  resetTime,
  resetLapTime,
  resetText,
  setText,
} from "./redux/reducers/main";
import { addEntry } from "./redux/reducers/entries";
import Entry, { EntryProps } from "./components/Entry";

const rootStyle = css`
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const timerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const timerDisplayStyle = css`
  font-size: 56px;
  color: red;
  font-family: monospace;
`;

const buttonStyle = css`
  button {
    display: inline-block;
    padding: 6px 10px;
    font-size: 18px;
    font-family: sans-serif;
    cursor: pointer;
    margin: 4px;
  }
`;

const textEntry = css`
  padding: 6px;
  font-size: 14px;
`;

const entriesStyle = css`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const curEntryStyle = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

function App(): JSX.Element {
  const dispatch = useDispatch();

  const isActive = useSelector((state: RootState) => state.main.isActive);
  const isPaused = useSelector((state: RootState) => state.main.isPaused);
  const time = useSelector((state: RootState) => state.main.time);
  const lapTime = useSelector((state: RootState) => state.main.lapTime);
  const text = useSelector((state: RootState) => state.main.text);
  const entries = useSelector((state: RootState) => state.entries.list);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        dispatch(incTime10());
      }, 10);
    } else if (interval != null) {
      clearInterval(interval);
    }

    return () => {
      if (interval != null) {
        clearInterval(interval);
      }
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    dispatch(start());
  };

  const handlePauseResume = () => {
    dispatch(isPaused ? unpause() : pause());
  };

  const handleStartPause = () => {
    if (isActive) {
      handlePauseResume();
    } else {
      handleStart();
    }
  };

  const handleReset = () => {
    dispatch(stop());
    dispatch(resetTime());
    dispatch(resetLapTime());
  };

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
        const entry: EntryProps = { time: lapTime, text };
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
    <div className="app" css={rootStyle}>
      <div className="timer" css={timerStyle}>
        <div className="timerDisplay" css={timerDisplayStyle}>
          {timeString(time)}
        </div>
        <div className="buttons" css={buttonStyle}>
          <button type="button" onClick={handleStartPause}>
            Start/Pause
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <div className="entries" css={entriesStyle}>
        <div className="currentEntry" css={curEntryStyle}>
          {timeString(lapTime)}
          <textarea
            value={text}
            onKeyUp={handleOnKeyUp}
            onKeyDown={handleOnKeyDown}
            onChange={handleChange}
            css={textEntry}
          />
        </div>
        {entries
          .slice()
          .reverse()
          .map((e) => (
            <Entry {...e} key={e.time} />
          ))}
      </div>
    </div>
  );
}

export default App;
