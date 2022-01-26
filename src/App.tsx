import { useState, useEffect } from "react";
import { css } from "@emotion/react";

const rootStyle = css`
  margin: 0;
  width: 100%;
  height: 100%;
`;

const timerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const displayStyle = css`
  font-size: 56px;
  color: red;
  text-align: center;
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

function App(): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

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
  };

  return (
    <div className="App" css={rootStyle}>
      <div className="timer" css={timerStyle}>
        <div className="timer-display" css={displayStyle}>
          <span className="digits">
            {`0${Math.floor((time / 60000) % 60)}`.slice(-2)}:
          </span>
          <span className="digits">
            {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}.
          </span>
          <span className="digits mili-sec">
            {`0${(time / 10) % 100}`.slice(-2)}
          </span>
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
    </div>
  );
}

export default App;
