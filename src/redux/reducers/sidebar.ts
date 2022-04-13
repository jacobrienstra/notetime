/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarSliceState {
  isOpen: boolean;
  curSection: number;
}

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
    curSection: 0,
  } as SidebarSliceState,
  reducers: {
    toggle: (state): void => {
      state.isOpen = !state.isOpen;
      state.curSection = 0;
    },
    close: (state): void => {
      state.isOpen = false;
      state.curSection = 0;
    },
    open: (state): void => {
      state.isOpen = true;
      state.curSection = 0;
    },
    openSection: (state, action: PayloadAction<number>): void => {
      state.curSection = action.payload;
    },
    toggleSection: (state, action: PayloadAction<number>): void => {
      if (state.curSection === action.payload) {
        state.curSection = 0;
      } else {
        state.curSection = action.payload;
      }
    },
    closeAllSections: (state): void => {
      state.curSection = 0;
    },
  },
});

export const {
  toggle,
  close,
  open,
  openSection,
  toggleSection,
  closeAllSections,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
