import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import NotFound from "./views/notFound/NotFound";
import LoginView from "./views/LoginView/Login";
import SignupContainer from "./views/SignupView/SignupView";
import  NavBarView  from "./views/profiles/profileView/NavBar";
import ProfileEdit from "./views/profiles/profileEdit/profileEdit";


const Routes = () => (
  <Router>
    <Provider store={store}>
      <NavBarView />
      <ToastContainer />
      <Switch>
        <Route path="/login" component={LoginView} exact />
        <Route path="/signup" component={SignupContainer} exact />
        <Route path="/profile/:username" component={ProfileEdit} exact />
        <Route path="*" component={NotFound} />
      </Switch>
    </Provider>
  </Router>
);

export default Routes;
