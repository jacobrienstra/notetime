import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faStop,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { css } from "@emotion/react";

import timeString from "../util";
import { RootState } from "../redux/store";
import {
  incTime10,
  start,
  pause,
  unpause,
  stop,
  resetTime,
  resetLapTime,
} from "../redux/reducers/main";

const timerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const timerDisplayStyle = css`
  font-size: 56px;
  color: var(--red);
  font-family: monospace;
`;

const buttonStyle = css`
  button {
    display: inline-block;
    width: 80px;
    height: 80px;
    font-size: 18px;
    font-family: sans-serif;
    cursor: pointer;
    margin: 4px;
    border-radius: 50%;
    border: 1px solid var(--blue);
  }
`;

const playButton = css`
  color: var(--green);
`;

const stopButton = css`
  color: var(--red);
`;

function Timer(): JSX.Element {
  const dispatch = useDispatch();

  const isActive = useSelector((state: RootState) => state.main.isActive);
  const isPaused = useSelector((state: RootState) => state.main.isPaused);
  const time = useSelector((state: RootState) => state.main.time);

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
  return (
    <div className="timer" css={timerStyle}>
      <div className="timerDisplay" css={timerDisplayStyle}>
        {timeString(time)}
      </div>
      <div className="buttons" css={buttonStyle}>
        <button type="button" onClick={handleStartPause} css={playButton}>
          <FontAwesomeIcon
            icon={
              isActive && !isPaused
                ? (faPause as IconProp)
                : (faPlay as IconProp)
            }
            size="2x"
          />
        </button>
        <button type="button" onClick={handleReset} css={stopButton}>
          <FontAwesomeIcon icon={faUndo as IconProp} size="2x" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
