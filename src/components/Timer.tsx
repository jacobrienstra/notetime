import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
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

const timerDisplay = css`
  &.timer-display {
    font-size: 56px;
    font-family: monospace;
  }
`;

const timerControls = css`
  &.timer-controls {
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

    .reset-button {
      color: var(--red-600);
    }

    .play-button {
      color: var(--green);
    }
  }
`;

const playButton = (isActive: boolean, isPaused: boolean) => css`
  &&& {
    padding-left: ${!isActive || isPaused ? "4px" : "0px"};
  }
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
    <Fragment>
      <div className="timer-display" css={timerDisplay}>
        {timeString(time)}
      </div>
      <div className="timer-controls" css={timerControls}>
        <button
          type="button"
          onClick={handleStartPause}
          className="play-button"
          css={playButton(isActive, isPaused)}
          title="Start/Pause"
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
        <button
          type="button"
          onClick={handleReset}
          className="reset-button"
          title="Reset"
        >
          <FontAwesomeIcon icon={faUndo as IconProp} size="2x" />
        </button>
      </div>
    </Fragment>
  );
}

export default Timer;
