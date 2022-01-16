import { createSlice } from "@reduxjs/toolkit";

/**
 *
 * creates auth slice with initial values, action creators, and async thunk creators
 *
 *
 */

const kanban = createSlice({
  name: "kanban",
  initialState: {
    items: [],
    ui: {},
  },

  reducers: {},

  // for async reducers
  extraReducers: {},
});

const getKanbanSlice = (state) => state.kanban;
// const {} = kanban.actions;

export { getKanbanSlice };
export default kanban.reducer;
