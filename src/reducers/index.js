import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import signupReducers from './signupReducer'

const rootReducer = combineReducers({
    user: signupReducers,
    login: LoginReducer
})
export default rootReducer;
