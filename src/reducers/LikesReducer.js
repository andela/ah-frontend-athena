import actionTypes from "../actions/actionTypes";

const initialState = {
  like_status: {},
  likes: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_LIKE_STATUS:
      return {
        ...state,
        like_status: action.payload,
        likes: {}
      };
    case actionTypes.LIKE:
      return {
        ...state,
        likes: action.payload
      };
    case actionTypes.DISLIKE:
      return {
        ...state,
        likes: action.payload
      };
    default:
      return state;
  }
}
