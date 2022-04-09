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
    padding: 0;
  }
`;

const playButton = (isActive: boolean, isPaused: boolean) => css`
  && {
    color: var(--green);
    padding-left: ${!isActive || isPaused ? "4px" : "0px"};
  }
`;

const stopButton = css`
  color: var(--red);
`;

function Timer(): JSX.Element {
  const dispatch = useDispatch();

  const isActive = useSelector((state: RootState) => state.main.isActive);
  const isPaused = useSelector((state: RootState) => state.main.isPaused);
  const time = useSelector((state: RootState) => state.main.time);

  let timerWorker: Worker;

  const startTimerWorker = () => {
    timerWorker = new Worker(`${process.env.PUBLIC_URL}/timerWorker.js`);
    timerWorker.onmessage = (e: MessageEvent) => {
      if (e?.data === "tick") {
        dispatch(incTime10());
      }
    };
    timerWorker.postMessage("start");
  };

  useEffect(() => {
    // Begin timer
    if (isActive && !isPaused) {
      startTimerWorker();
    } else if (timerWorker != null) timerWorker.terminate();

    return () => {
      if (timerWorker != null) timerWorker.terminate();
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
        <button
          type="button"
          onClick={handleStartPause}
          css={playButton(isActive, isPaused)}
        >
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
