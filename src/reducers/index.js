import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import signupReducers from "./signupReducer";
import googleAuthReducer from "./googleAuthReducer";
import facebookAuthReducer from "./facebookAuthReducer";

const rootReducer = combineReducers({
  user: signupReducers,
  login: LoginReducer,
  googleLogin: googleAuthReducer,
  facebookLogin: facebookAuthReducer
});
export default rootReducer;
