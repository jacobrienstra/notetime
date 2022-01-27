import React, {
  useState,
  useEffect,
  KeyboardEventHandler,
  KeyboardEvent,
  ChangeEvent,
  ChangeEventHandler,
} from "react";
import { css } from "@emotion/react";

import timeString from "./util";
import Entry, { EntryProps } from "./Entry";

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
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [lap, setLap] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [entries, setEntries] = useState<EntryProps[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((t) => t + 10);
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
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStartPause = () => {
    if (isActive) {
      handlePauseResume();
    } else {
      handleStart();
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setLap(0);
  };

  const handleOnKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (text.trim() === "" && e.key.length === 1) {
      setLap(time);
    }
  };

  const handleOnKeyUp: KeyboardEventHandler<HTMLTextAreaElement> = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (text.trim() !== "") {
        const entry = { time: lap, text };
        setEntries((ev) => [...ev, entry]);
      }
      setText("");
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(event.target.value);
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
          {timeString(lap)}
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
