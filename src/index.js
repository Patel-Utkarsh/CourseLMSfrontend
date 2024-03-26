import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Data from "./data";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>

  <Data>
  <App />
  <ToastContainer/>

</Data>
</BrowserRouter>
);
