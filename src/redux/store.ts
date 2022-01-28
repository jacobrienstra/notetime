import { configureStore } from "@reduxjs/toolkit";

import { mainReducer, entriesReducer } from "./reducers";

const store = configureStore({
  reducer: {
    main: mainReducer,
    entries: entriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
