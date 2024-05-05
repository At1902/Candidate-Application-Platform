import { configureStore } from "@reduxjs/toolkit";
import reducer from "./jobSlice";

export const store = configureStore({
  reducer,
});
