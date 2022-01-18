import { createSlice } from "@reduxjs/toolkit";

// users = [
// {
//     name: "",
//     username: "",
//     email: "",
//     number: "",
//     password: "",
// },
// {
//     name: "",
//     username: "",
//     email: "",
//     number: "",
//     password: "",
// },
// ]

/**
 *
 * creates auth slice with initial values, action creators, and async thunk creators
 *
 *
 */

const auth = createSlice({
  name: "auth",
  initialState: {
    users: [],
    isAuth: false,
    loggedInUser: {},

    //managing loading or error state for async actions based on the promise's 'pending', 'fulfilled', 'rejected' state.
    ui: {
      login: {
        loading: false,
        message: null,
      },
      signup: {
        loading: false,
        message: null,
      },
    },
  },

  reducers: {
    login: (state, actions) => {
      state.ui.login.message = null;
      const foundUser = state.users.find(
        (user) => user.email === actions.payload.email
      );
      if (!foundUser) {
        state.loggedInUser = {};
        state.isAuth = false;
        state.ui.login.message = "Please register yourself.";
        return;
      }
      if (foundUser && foundUser.password === actions.payload.password) {
        state.loggedInUser = actions.payload;
        state.isAuth = true;
      } else {
        state.loggedInUser = {};
        state.isAuth = false;
        state.ui.login.message = "Invalid Username/Password";
      }
    },
    signup: (state, actions) => {
      state.ui.signup.message = null;
      state.hasSignedup = false;
      const foundUser = state.users.find(
        (user) => user.email === actions.payload.email
      );
      if (!foundUser) {
        state.users.push(actions.payload);
        state.ui.signup.message = "Signedup Successfully.";
      } else {
        state.ui.signup.message = "User with this email already exists.";
      }
    },

    removemessage: (state, actions) => {
      //typ ---> login | signup
      const { type } = actions.payload;
      state.ui[type].message = null;
    },
  },

  // for async reducers
  extraReducers: {},
});

const getAuthSlice = (state) => state.auth;
const { login, signup, removemessage } = auth.actions;

export { login, signup, removemessage, getAuthSlice };
export default auth.reducer;
