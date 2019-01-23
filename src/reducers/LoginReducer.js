import actionTypes from "../actions/actionTypes";

const initialState = {
  login: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        login: action.payload
      };
    default:
      return state;
  }
}
