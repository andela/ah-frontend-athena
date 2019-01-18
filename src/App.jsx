import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import Routes from "./Router";
import "./App.scss";
import "react-toastify/dist/ReactToastify.min.css";

class App extends Component {
  /**
   * create the main component
   * @returns {<Routes />} route component
   * @argument {props} props
   */
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * render components
   * @returns {<div>}  element
   */
  render() {
    return (
      <div>
        <Routes />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
