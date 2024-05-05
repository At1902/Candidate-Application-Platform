import { configureStore } from "@reduxjs/toolkit";
import reducer from "./jobSlice";

const store = configureStore({
  reducer,
});

export default store;
