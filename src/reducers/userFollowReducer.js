import actionTypes from "../actions/actionTypes";

const initialState = {
  data: {
    following: false
  },
  followers: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FOLLOW_USER:
      return {
        ...state,
        data: action.payload
      };
    case actionTypes.UNFOLLOW_USER:
      return {
        ...state,
        data: action.payload
      };
    case actionTypes.GET_FOLLOWING:
      return {
        ...state,
        data: action.payload
      };
    case actionTypes.GET_FOLLOWERS:
      return {
        ...state,
        followers: action.payload
      }
    default:
      return state;
  }
}
