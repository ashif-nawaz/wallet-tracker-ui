import { Satellite } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

/**
 *
 * creates auth slice with initial values, action creators, and async thunk creators
 *
 *
 */

const navigateTaskItem = (state, columnId, item, targetStage) => {
  const sourceColumn = state.columns[columnId];
  const itemIndex = sourceColumn.items.findIndex(
    (task, index) => task.id === item.id
  );
  sourceColumn.items.splice(itemIndex, 1);
  let destinationColumnId;
  for (const [columnId, column] of Object.entries(state.columns)) {
    if (column.stage === targetStage) {
      destinationColumnId = columnId;
      break;
    }
  }
  state.columns[destinationColumnId].items.unshift(item);
};

const INTIAL_ITEMS = [
  {
    id: uuid(),
    content: "First task",
    deadline: new Date("2022-08-18T21:11:54").toISOString(),
    priority: "high",
  },
  {
    id: uuid(),
    content: "Second task",
    deadline: new Date("2022-08-18T21:11:54").toISOString(),
    priority: "medium",
  },
  {
    id: uuid(),
    content: "Third task",
    deadline: new Date("2022-08-18T21:11:54").toISOString(),
    priority: "medium",
  },
  {
    id: uuid(),
    content: "Fourth task",
    deadline: new Date("2022-08-18T21:11:54").toISOString(),
    priority: "high",
  },
  {
    id: uuid(),
    content: "Fifth task",
    deadline: new Date("2022-08-18T21:11:54").toISOString(),
    priority: "low",
  },
];

const COLUMNS = {
  Backlog: {
    stage: 1,
    name: "Backlog",
    items: INTIAL_ITEMS,
  },
  ToDo: {
    stage: 2,
    name: "To do",
    items: [],
  },
  Ongoing: {
    stage: 3,
    name: "Ongoing",
    items: [],
  },
  Done: {
    stage: 4,
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
      const { name, deadline, priority } = action.payload;
      const newTask = {
        id: uuid(),
        content: name,
        deadline,
        priority,
      };
      console.log(newTask);
      state.columns.Backlog.items.unshift(newTask);
    },

    onItemAction: (state, action) => {
      const { type, columnId, stage, item } = action.payload;
      console.log(stage);
      if (type === "DELETE") {
        const targetItemsList = state.columns[columnId].items;
        const itemIndex = targetItemsList.findIndex(
          (task, index) => task.id === item.id
        );
        targetItemsList.splice(itemIndex, 1);
      } else if (type === "BACK") {
        const targetStage = stage - 1;
        navigateTaskItem(state, columnId, item, targetStage);
      } else if (type === "FORWARD") {
        const targetStage = stage + 1;
        navigateTaskItem(state, columnId, item, targetStage);
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
