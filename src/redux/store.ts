import { configureStore } from "@reduxjs/toolkit";

import { timerReducer, entriesReducer } from "./reducers";

const store = configureStore({
  reducer: {
    timer: timerReducer,
    entries: entriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
