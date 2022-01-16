import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import kanban from "./kanban";

const store = configureStore({
  reducer: {
    auth,
    kanban,
  },
});

export default store;
