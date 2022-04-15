import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faUndo } from "@fortawesome/free-solid-svg-icons";
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
} from "../redux/reducers/timer";

const timerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const timerDisplayStyle = css`
  font-size: 56px;
  font-family: monospace;
`;

const buttonStyle = css`
  button {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 4px;
    padding: 0;

    font-size: 18px;
    font-family: sans-serif;

    border-radius: 50%;
    cursor: pointer;

    transition-property: border-color;
  }
`;

const playButton = (isActive: boolean, isPaused: boolean) => css`
  && {
    padding-left: ${!isActive || isPaused ? "4px" : "0px"};

    color: var(--green);
  }
`;

const stopButton = css`
  color: var(--red-600);
`;

function Timer(): JSX.Element {
  const dispatch = useDispatch();

  const isActive = useSelector((state: RootState) => state.timer.isActive);
  const isPaused = useSelector((state: RootState) => state.timer.isPaused);
  const time = useSelector((state: RootState) => state.timer.time);

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
