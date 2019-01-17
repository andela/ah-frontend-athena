import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store';
import NotFound from './views/notFound/NotFound'
import Login from './views/LoginView/Login'

const Routes = () =>(
  <Router>
    <Provider store={store}>
      <Switch>
        <Route path='/login' component={Login} exact />
        <Route path='*' component={NotFound} />
      </Switch>
    </Provider>        
  </Router>
)

export default Routes
