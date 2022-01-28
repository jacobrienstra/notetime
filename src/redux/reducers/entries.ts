/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EntryProps } from "../../components/Entry";

interface EntriesSliceState {
  list: EntryProps[];
}

export const entriesSlice = createSlice({
  name: "game",
  initialState: {
    list: [],
  } as EntriesSliceState,
  reducers: {
    addEntry: (state, action: PayloadAction<EntryProps>): void => {
      state.list = [...state.list, action.payload];
    },
  },
});

export const { addEntry } = entriesSlice.actions;

export default entriesSlice.reducer;
