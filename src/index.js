import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import "./index.css";
import App from "./App";

import "@fontsource/sora";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
