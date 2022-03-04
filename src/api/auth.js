import client from ".";

const signup = (payload) => client.post("/auth/signup", payload);
const login = (payload) => client.post("/auth/login", payload);

export { signup, login };
