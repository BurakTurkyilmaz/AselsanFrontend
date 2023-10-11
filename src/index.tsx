import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const theme = createTheme({
  palette: {
    success: {
      main: "#00ff26",
    },
  },
});

const container = document.getElementById("root")!;
const root = render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
