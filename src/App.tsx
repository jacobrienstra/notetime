import React from "react";
import { css } from "@emotion/react";

import Timer from "./components/Timer";
import Settings from "./components/Settings";
import LapEntry from "./components/LapEntry";
import EntryList from "./components/EntryList";

const rootStyle = css`
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App(): JSX.Element {
  return (
    <div className="app" css={rootStyle}>
      <Settings />
      <Timer />
      <LapEntry />
      <EntryList />
    </div>
  );
}

export default App;
