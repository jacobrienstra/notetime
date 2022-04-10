/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsSliceState {
  isOpen: boolean;
  reverseOrder: boolean;
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    isOpen: false,
    reverseOrder: false,
  } as SettingsSliceState,
  reducers: {
    toggle: (state): void => {
      state.isOpen = !state.isOpen;
    },
    close: (state): void => {
      state.isOpen = false;
    },
    open: (state): void => {
      state.isOpen = true;
    },
    setOrderReverse: (state, action: PayloadAction<boolean>): void => {
      state.reverseOrder = action.payload;
    },
  },
});

export const { toggle, setOrderReverse, close, open } = settingsSlice.actions;

export default settingsSlice.reducer;
