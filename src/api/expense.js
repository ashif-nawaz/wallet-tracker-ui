import client from ".";

const addExpense = (payload) => client.post("/expense", payload);
const editExpense = (payload) => client.put("/expense", payload);
const deleteExpense = (payload) =>
  client.delete("/expense", { data: { ...payload } });
const fetchExpense = (params) => client.get("/expense");

export { addExpense, editExpense, deleteExpense, fetchExpense };
