import { configureStore } from "@reduxjs/toolkit";

import { timerReducer, entriesReducer, settingsReducer } from "./reducers";

const store = configureStore({
  reducer: {
    timer: timerReducer,
    entries: entriesReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
