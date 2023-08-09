/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsSliceState {
  reverseOrder: boolean;
  precision: number;
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    reverseOrder: false,
    precision: 0,
  } as SettingsSliceState,
  reducers: {
    setOrderReverse: (state, action: PayloadAction<boolean>): void => {
      state.reverseOrder = action.payload;
    },
    setPrecision: (state, action: PayloadAction<number>): void => {
      state.precision = action.payload;
    },
  },
});

export const { setOrderReverse, setPrecision } = settingsSlice.actions;

export default settingsSlice.reducer;
