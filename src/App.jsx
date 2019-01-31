import React from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./Router";
import "./App.scss";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * create the main component
 * @returns {<Routes />} route component
 * @argument {props} props
 */

const App = () => (
  <div className="full">
    <Routes />
    <ToastContainer />
  </div>
);

export default App;
