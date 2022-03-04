import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../../api/auth";

const postLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { data } = await login({ email, password });
    return data;
  }
);
const postSignup = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }) => {
    const { data } = await signup({ email, password, name });
    return data;
  }
);

/**
 *
 * creates auth slice with initial values, action creators, and async thunk creators
 *
 *
 */

const auth = createSlice({
  name: "auth",
  initialState: {
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
    persistUser: (state, action) => {
      const { token, userName } = action.payload;
      if (!token || !userName) return;
      state.loggedInUser = action.payload;
      state.isAuth = true;
    },
    // login: (state, actions) => {
    //   state.ui.login.message = null;
    //   const foundUser = state.users.find(
    //     (user) => user.email === actions.payload.email
    //   );
    //   if (!foundUser) {
    //     state.loggedInUser = {};
    //     state.isAuth = false;
    //     state.ui.login.message = "Please register yourself.";
    //     return;
    //   }
    //   if (foundUser && foundUser.password === actions.payload.password) {
    //     state.loggedInUser = actions.payload;
    //     state.isAuth = true;
    //   } else {
    //     state.loggedInUser = {};
    //     state.isAuth = false;
    //     state.ui.login.message = "Invalid Username/Password";
    //   }
    // },
    // signup: (state, actions) => {
    //   state.ui.signup.message = null;
    //   state.hasSignedup = false;
    //   const foundUser = state.users.find(
    //     (user) => user.email === actions.payload.email
    //   );
    //   if (!foundUser) {
    //     state.users.push(actions.payload);
    //     state.ui.signup.message = "Signedup Successfully.";
    //   } else {
    //     state.ui.signup.message = "User with this email already exists.";
    //   }
    // },
    removemessage: (state, actions) => {
      //typ ---> login | signup
      const { type } = actions.payload;
      state.ui[type].message = null;
    },
  },

  // for async reducers
  extraReducers: {
    [postLogin.loading]: (state, action) => {
      state.ui.login.loading = true;
      state.ui.login.message = null;
    },
    [postLogin.fulfilled]: (state, action) => {
      state.ui.login.loading = false;
      console.log(action.payload);
      const { token, userName, id } = action.payload.data;
      state.loggedInUser = action.payload.data;
      state.isAuth = true;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("userId", id);
      window.localStorage.setItem("userName", userName);
      state.ui.login.message = null;
    },
    [postLogin.rejected]: (state, action) => {
      state.ui.login.loading = false;
      state.ui.login.message = action.payload.message;
    },

    [postSignup.loading]: (state, action) => {
      state.ui.signup.loading = true;
      state.ui.signup.message = null;
    },
    [postSignup.fulfilled]: (state, action) => {
      state.ui.signup.loading = false;
      console.log(action.payload);
      state.ui.signup.message = null;
    },
    [postSignup.rejected]: (state, action) => {
      state.ui.signup.loading = false;
      state.ui.signup.message = action.payload.message;
    },
  },
});

const getAuthSlice = (state) => state.auth;
const { removemessage, persistUser } = auth.actions;

export { postLogin, postSignup, removemessage, persistUser, getAuthSlice };
export default auth.reducer;
