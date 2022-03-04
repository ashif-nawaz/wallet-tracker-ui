import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {
  addExpense,
  editExpense,
  deleteExpense,
  fetchExpense,
} from "../../api/expense";

/**
 *
 * creates auth slice with initial values, action creators, and async thunk creators
 *
 *
 */

const expenseAdd = createAsyncThunk("auth/expenseAdd", async (payload) => {
  const { data } = await addExpense(payload);
  return data.data;
});
const expenseEdit = createAsyncThunk("auth/expenseEdit", async (payload) => {
  const { data } = await editExpense(payload);
  return data.data;
});
const expenseDelete = createAsyncThunk(
  "auth/expenseDelete",
  async (payload) => {
    const { data } = await deleteExpense(payload);
    return data.data;
  }
);
const expenseFetch = createAsyncThunk("auth/expenseFetch", async (params) => {
  const { data } = await fetchExpense(params);
  return data.data;
});

const expense = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    recentExpense: {},
    totalExpenses: 0,
    ui: {
      expenseAdd: {
        loading: false,
        message: null,
      },
      expenseEdit: {
        loading: false,
        message: null,
      },
      expenseDelete: {
        loading: false,
        message: null,
      },
      expenseFetch: {
        loading: false,
        message: null,
      },
    },
  },

  reducers: {
    // updateColumn: (state, action) => {
    //   const { source, destination } = action.payload;
    //   if (destination.droppableId === "delete") {
    //     state.columns[source.droppableId].items.splice(destination.index, 1);
    //     return;
    //   }
    //   if (source.droppableId !== destination.droppableId) {
    //     const sourceColumn = state.columns[source.droppableId];
    //     const destColumn = state.columns[destination.droppableId];
    //     const sourceItems = [...sourceColumn.items];
    //     const destItems = [...destColumn.items];
    //     const [removed] = sourceItems.splice(source.index, 1);
    //     destItems.splice(destination.index, 0, removed);
    //     state.columns = {
    //       ...state.columns,
    //       [source.droppableId]: {
    //         ...sourceColumn,
    //         items: sourceItems,
    //       },
    //       [destination.droppableId]: {
    //         ...destColumn,
    //         items: destItems,
    //       },
    //     };
    //   } else {
    //     const column = state.columns[source.droppableId];
    //     const copiedItems = [...column.items];
    //     const [removed] = copiedItems.splice(source.index, 1);
    //     copiedItems.splice(destination.index, 0, removed);
    //     state.columns = {
    //       ...state.columns,
    //       [source.droppableId]: {
    //         ...column,
    //         items: copiedItems,
    //       },
    //     };
    //   }
    // },
    // addItem: (state, action) => {
    //   const { name, deadline, priority, columnId } = action.payload;
    //   const newTask = {
    //     id: uuid(),
    //     content: name,
    //     deadline,
    //     priority,
    //   };
    //   state.columns.Backlog.items.unshift(newTask);
    // },
    // editItem: (state, action) => {
    //   const { name, deadline, priority, columnId, id } = action.payload;
    //   const newTask = {
    //     id: id,
    //     content: name,
    //     deadline,
    //     priority,
    //   };
    //   const itemIndex = state.columns[columnId].items.findIndex(
    //     (item) => item.id === id
    //   );
    //   state.columns[columnId].items.splice(itemIndex, 1, newTask);
    // },
    // onItemAction: (state, action) => {
    //   const { type, columnId, stage, item } = action.payload;
    //   console.log(stage);
    //   if (type === "DELETE") {
    //     const targetItemsList = state.columns[columnId].items;
    //     const itemIndex = targetItemsList.findIndex(
    //       (task, index) => task.id === item.id
    //     );
    //     targetItemsList.splice(itemIndex, 1);
    //   } else if (type === "BACK") {
    //     const targetStage = stage - 1;
    //     navigateTaskItem(state, columnId, item, targetStage);
    //   } else if (type === "FORWARD") {
    //     const targetStage = stage + 1;
    //     navigateTaskItem(state, columnId, item, targetStage);
    //   }
    // },
  },

  // for async reducers
  extraReducers: {
    [expenseAdd.loading]: (state, action) => {
      state.ui.expenseAdd.loading = true;
      console.log(action);
      state.ui.expenseAdd.message = null;
    },
    [expenseAdd.fulfilled]: (state, action) => {
      state.ui.expenseAdd.loading = false;
      state.expenses = action.payload;
      state.recentExpense = action.payload;
      state.ui.expenseAdd.message = null;
    },
    [expenseAdd.rejected]: (state, action) => {
      state.ui.expenseAdd.loading = false;
      state.ui.expenseAdd.message = action.payload.message;
    },

    [expenseEdit.loading]: (state, action) => {
      state.ui.expenseEdit.loading = true;
      state.ui.expenseEdit.message = null;
    },
    [expenseEdit.fulfilled]: (state, action) => {
      state.ui.expenseEdit.loading = false;
      console.log("edit", action.payload);
      state.expenses = action.payload;
      state.ui.expenseEdit.message = null;
    },
    [expenseEdit.rejected]: (state, action) => {
      state.ui.expenseEdit.loading = false;
      state.ui.expenseEdit.message = action.payload.message;
    },

    [expenseFetch.loading]: (state, action) => {
      state.ui.expenseFetch.loading = true;
      state.ui.expenseFetch.message = null;
    },
    [expenseFetch.fulfilled]: (state, action) => {
      state.ui.expenseFetch.loading = false;
      state.expenses = action.payload;
      state.totalExpenses = action.payload.reduce(
        (previousValue, currentValue) => previousValue + currentValue.amount,
        0
      );
      console.log(action.payload);
      state.ui.expenseFetch.message = null;
    },
    [expenseFetch.rejected]: (state, action) => {
      state.ui.expenseFetch.loading = false;
      state.ui.expenseFetch.message = action.payload.message;
    },

    [expenseDelete.loading]: (state, action) => {
      state.ui.expenseDelete.loading = true;
      state.ui.expenseDelete.message = null;
    },
    [expenseDelete.fulfilled]: (state, action) => {
      state.ui.expenseDelete.loading = false;
      console.log("delete", action.payload);
      state.expenses = action.payload;
      state.ui.expenseDelete.message = null;
    },
    [expenseDelete.rejected]: (state, action) => {
      state.ui.expenseDelete.loading = false;
      state.ui.expenseDelete.message = action.payload.message;
    },
  },
});

const getExpenseSlice = (state) => state.expense;
// const { updateColumn, onItemAction, addItem, editItem } = kanban.actions;

export {
  getExpenseSlice,
  expenseAdd,
  expenseEdit,
  expenseDelete,
  expenseFetch,
};
export default expense.reducer;
