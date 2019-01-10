import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './views/notFound/NotFound'
import Signup from './views/auth/signup/Signup'
import Login from './views/auth/Login/Login'

const Routes = () =>(
    <Router>
        <Provider store = {store}>
        <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/signup' component={Signup} exact />
            <Route path='*' component={NotFound}/>
        </Switch>
        </Provider>        
    </Router>
)

export default Routes
