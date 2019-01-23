import actionTypes from '../../actions/actionTypes';

const initialState = {
  message:  {},
  errors: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case actionTypes.PASSWORD_RESET_RESULTS:
      return {
        ...state,
        message: action.payload
      };
    case actionTypes.PASSWORD_RESET_ERRORS:
    return {
      ...state,
      errors: action.payload
    };
    default:
      return state;
  }
}
