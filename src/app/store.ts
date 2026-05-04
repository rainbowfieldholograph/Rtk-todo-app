import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../shared/redux";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export { store };
