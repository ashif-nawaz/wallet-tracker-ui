import { Satellite } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

/**
 *
 * creates auth slice with initial values, action creators, and async thunk creators
 *
 *
 */

const INTIAL_ITEMS = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" },
];

const COLUMNS = {
  Backlog: {
    name: "Backlog",
    items: INTIAL_ITEMS,
  },
  ToDo: {
    name: "To do",
    items: [],
  },
  Ongoing: {
    name: "Ongoing",
    items: [],
  },
  Done: {
    name: "Done",
    items: [],
  },
};

const kanban = createSlice({
  name: "kanban",
  initialState: {
    columns: COLUMNS,
    ui: {},
  },

  reducers: {
    updateColumn: (state, action) => {
      const { source, destination } = action.payload;

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = state.columns[source.droppableId];
        const destColumn = state.columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        };
      } else {
        const column = state.columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        state.columns = {
          ...state.columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        };
      }
    },

    addItem: (state, action) => {
      state.columns.Backlog.items.unshift(action.payload);
    },

    onItemAction: (state, action) => {
      const { type, columnId, item } = action.payload;
      if (type === "DELETE") {
        const targetItemsList = state.columns[columnId].items;
        const itemIndex = targetItemsList.findIndex(
          (task, index) => task.id === item.id
        );
        targetItemsList.splice(itemIndex, 1);
      } else if (type === "BACK") {
      } else if (type === "FORWARD") {
      }
    },
  },

  // for async reducers
  extraReducers: {},
});

const getKanbanSlice = (state) => state.kanban;
const { updateColumn, onItemAction, addItem } = kanban.actions;

export { getKanbanSlice, updateColumn, onItemAction, addItem };
export default kanban.reducer;
