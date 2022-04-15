import { css } from "@emotion/react";

import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";
import NoteInput from "./components/NoteInput";
import EntryList from "./components/EntryList";

const bodyWrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`;

const mainRoot = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App(): JSX.Element {
  return (
    <div className="app" css={bodyWrap}>
      <Sidebar />
      <main css={mainRoot}>
        <Timer />
        <NoteInput />
        <EntryList />
      </main>
    </div>
  );
}

export default App;
