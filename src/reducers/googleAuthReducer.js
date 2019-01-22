import actionTypes from "../actions/actionTypes";

const initialState = {
  loggedIn: false
};

const googleAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GOOGLE_LOGIN:
      return {
        ...state,
        responseData: action.payload,
        social: actionTypes.GOOGLE_LOGIN
      };
    default:
      return state;
  }
};

export default googleAuthReducer;
