import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { theme } from "./theme";
import "./assets/css/index.css";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ThemeProvider>
  </ContextProvider>
);
