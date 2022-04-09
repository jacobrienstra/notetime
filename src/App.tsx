import React from "react";
import { css } from "@emotion/react";

import Timer from "./components/Timer";
import LapEntry from "./components/LapEntry";
import EntryList from "./components/EntryList";

const rootStyle = css`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const settingsStyle = css`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  cursor: pointer;

  img {
    &:hover {
      transform: scale(1.1);
      /* content: url(${process.env.PUBLIC_URL}/logo192shadow.png); */
    }
  }
`;

function App(): JSX.Element {
  return (
    <div className="app" css={rootStyle}>
      <div className="settings" css={settingsStyle}>
        <img
          width="50"
          src={`${process.env.PUBLIC_URL}/logo192.png`}
          alt="logo"
        />
      </div>
      <Timer />
      <div>
        <LapEntry />
        <EntryList />
      </div>
    </div>
  );
}

export default App;
