import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import NotFound from "./views/notFound/NotFound";
import LoginView from "./views/LoginView/Login";
import NavBarView  from "./views/profiles/profileView/NavBar";
import ProfileEdit from "./views/profiles/profileEdit/profileEdit";
import PasswordResetView from './views/PasswordReset/PasswordReset';
import PasswordResetConfirmView from './views/PasswordReset/PasswordResetConfirm';
import EmailPage from './components/PasswordReset/EmailPage'
import Signup from './views/auth/signup/Signup'
import Login from './views/auth/Login/Login'
import Articles from './views/articles/Articles'

const Routes = () => (
  <Router>
    <Provider store={store}>
      <NavBarView />
      <ToastContainer />
      <Switch>
        <Route path="/login" component={LoginView} exact />
        <Route path="/profile/:username" component={ProfileEdit} exact />
        <Route path='/passwordreset' component={PasswordResetView} exact />
        <Route path='/password_reset_confirm/:token' component={PasswordResetConfirmView} exact />
        <Route path='/email-has-been-sent' component={EmailPage} exact />
        <Route path='/login' component={Login} exact />
        <Route path='/signup' component={Signup} exact />
        <Route path='/articles' component={Articles} exact />
        <Route path='*' component={NotFound} />
      </Switch>
    </Provider>
  </Router>
);

export default Routes;
