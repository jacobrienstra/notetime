import { configureStore } from "@reduxjs/toolkit";

import {
  timerReducer,
  entriesReducer,
  settingsReducer,
  sidebarReducer,
} from "./reducers";

const store = configureStore({
  reducer: {
    timer: timerReducer,
    entries: entriesReducer,
    settings: settingsReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
