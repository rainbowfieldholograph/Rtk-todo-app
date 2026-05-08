import { combineSlices } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppState = any;

const rootReducer = combineSlices();

const useAppSelector = useSelector.withTypes<AppState>();

export { rootReducer, useAppSelector };
export type { AppState };
