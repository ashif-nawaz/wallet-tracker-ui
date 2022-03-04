import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import expense from "./expense";

const store = configureStore({
  reducer: {
    auth,
    expense,
  },
});

export default store;
