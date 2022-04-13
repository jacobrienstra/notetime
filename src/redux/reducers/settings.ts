/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsSliceState {
  reverseOrder: boolean;
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    reverseOrder: false,
  } as SettingsSliceState,
  reducers: {
    setOrderReverse: (state, action: PayloadAction<boolean>): void => {
      state.reverseOrder = action.payload;
    },
  },
});

export const { setOrderReverse } = settingsSlice.actions;

export default settingsSlice.reducer;
