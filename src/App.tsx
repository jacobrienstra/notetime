import { css } from "@emotion/react";

import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";
import LapEntry from "./components/LapEntry";
import EntryList from "./components/EntryList";

const app = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

function App(): JSX.Element {
  return (
    <main className="app" css={app}>
      <Sidebar />
      <Timer />
      <LapEntry />
      <EntryList />
    </main>
  );
}

export default App;
