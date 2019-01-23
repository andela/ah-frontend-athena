import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import signupReducers from "./signupReducer";
import googleAuthReducer from "./googleAuthReducer";
import facebookAuthReducer from "./facebookAuthReducer";
import profileReducer from './profileReducer';
import PasswordResetReducer from './passwordReducers/PasswordResetReducer';

const rootReducer = combineReducers({
  user: signupReducers,
  login: LoginReducer,
  googleLogin: googleAuthReducer,
  facebookLogin: facebookAuthReducer,
  profile: profileReducer,
  "passwordResetConfirm": PasswordResetReducer
})
export default rootReducer;

