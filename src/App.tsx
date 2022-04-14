import { css } from "@emotion/react";

import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";
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
      <Sidebar />
      <Timer />
      <LapEntry />
      <EntryList />
    </div>
  );
}

export default App;
