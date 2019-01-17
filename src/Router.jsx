import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import NotFound from "./views/notFound/NotFound";
import Login from "./views/LoginView/Login";
import SignupContainer from "./views/SignupView/SignupView";

const Routes = () => (
  <Router>
    <Provider store={store}>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={SignupContainer} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    </Provider>
  </Router>
);

export default Routes;
