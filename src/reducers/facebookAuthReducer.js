import actionTypes from "../actions/actionTypes";

const initialState = {
  loggedIn: false
};

const facebookAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FACEBOOK_LOGIN:
      return {
        ...state,
        responseData: action.payload,
        social: actionTypes.FACEBOOK_LOGIN
      };
    default:
      return state;
  }
};

export default facebookAuthReducer;
