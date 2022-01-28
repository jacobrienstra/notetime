import { useSelector } from "react-redux";
import * as React from "react";
import { css } from "@emotion/react";

import { RootState } from "../redux/store";

import Entry from "./Entry";

const entriesStyle = css`
  display: flex;
  flex-direction: column;
  align-content: stretch;
  align-items: stretch;
`;

function EntryList(): JSX.Element {
  const entries = useSelector((state: RootState) => state.entries.list);

  return (
    <div className="entries" css={entriesStyle}>
      {entries.map((e) => (
        <Entry {...e} key={e.key} />
      ))}
    </div>
  );
}

export default EntryList;
