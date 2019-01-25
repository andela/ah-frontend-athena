import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import NotFound from "./views/notFound/NotFound";
import NavBarView from "./views/profiles/profileView/NavBar";
import ProfileEdit from "./views/profiles/profileEdit/profileEdit";
import PasswordResetView from "./views/PasswordReset/PasswordReset";
import PasswordResetConfirmView from "./views/PasswordReset/PasswordResetConfirm";
import EmailPage from "./components/PasswordReset/EmailPage";
import Signup from "./views/SignupView/SignupView";
import ArticleList from "./views/Articles/articleList/ArticleList";
import ArticleView from "./views/Articles/articleView/ArticleView";
import ArticleEdit from "./views/Articles/articleEdit/ArticleEdit";
import ArticleCreate from "./views/Articles/articleCreate/ArticleCreate";
import Followers from './views/followsView/followersView/followersView';
import Following from './views/followsView/followingView/followingView';
import LoginView from "./views/LoginView/Login";
import SignupContainer from "./views/SignupView/SignupView";

const Routes = () => (
  <Router>
    <Provider store={store}>
      <NavBarView />
      <ToastContainer />
      <Switch>
        <Route path="/signup" component={Signup} exact />
        <Route path="/login" component={LoginView} exact />
        <Route path="/signup" component={SignupContainer} exact />
        <Route path="/profile/:username" component={ProfileEdit} exact />
        <Route path="/passwordreset" component={PasswordResetView} exact />
        <Route path='/followers' component={Followers} exact />
        <Route path='/following' component={Following} exact />
        <Route
          path="/password_reset_confirm/:token"
          component={PasswordResetConfirmView}
          exact
        />
        <Route path="/email-has-been-sent" component={EmailPage} exact />
        <Route path="/" component={ArticleList} exact />
        <Route path="/create" component={ArticleCreate} exact />
        <Route path="/articles/:slug" component={ArticleView} exact />
        <Route path="/articles/edit/:slug" component={ArticleEdit} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Provider>
  </Router>
);

export default Routes;
