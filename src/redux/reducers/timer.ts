/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerSliceState {
  time: number;
  pausedTime: number;
  isActive: boolean;
  isPaused: boolean;
  lapTime: number;
  text: string;
}

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    time: 0,
    pausedTime: 0,
    isActive: false,
    isPaused: false,
    lapTime: 0,
    text: "",
  } as TimerSliceState,
  reducers: {
    setTime: (state, action: PayloadAction<number>): void => {
      state.time = state.pausedTime + action.payload;
    },
    resetTime: (state): void => {
      state.time = 0;
      state.pausedTime = 0;
    },
    setLapTime: (state, action: PayloadAction<number>): void => {
      state.lapTime = action.payload;
    },
    resetLapTime: (state): void => {
      state.lapTime = 0;
    },
    start: (state): void => {
      state.isActive = true;
      state.isPaused = false;
    },
    stop: (state): void => {
      state.isActive = false;
      state.isPaused = false;
    },
    pause: (state): void => {
      state.isPaused = true;
      state.pausedTime = state.time;
    },
    unpause: (state): void => {
      state.isPaused = false;
    },
    setText: (state, action: PayloadAction<string>): void => {
      state.text = action.payload;
    },
    resetText: (state): void => {
      state.text = "";
    },
  },
});

export const {
  setTime,
  resetTime,
  setLapTime,
  resetLapTime,
  start,
  stop,
  pause,
  unpause,
  setText,
  resetText,
} = timerSlice.actions;

export default timerSlice.reducer;
