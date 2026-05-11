import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "../shared/redux";

const store = configureStore({
  devTools: true,
  reducer: rootReducer,
});

export { store };
