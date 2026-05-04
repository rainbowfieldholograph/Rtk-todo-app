import { combineSlices } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type AppState = any;

const rootReducer = combineSlices();

const useAppSelector = useSelector.withTypes<AppState>();

export { rootReducer, useAppSelector };
export type { AppState };
