/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { EntryProps } from "../../components/Entry";

interface EntriesSliceState {
  list: EntryProps[];
}

export const entriesSlice = createSlice({
  name: "entries",
  initialState: {
    list: [],
  } as EntriesSliceState,
  reducers: {
    addEntry: (state, action: PayloadAction<EntryProps>): void => {
      state.list = [...state.list, action.payload];
    },
    clearEntries: (state): void => {
      state.list = [];
    },
  },
});

export const { addEntry, clearEntries } = entriesSlice.actions;

export default entriesSlice.reducer;
