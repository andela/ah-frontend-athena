import actionTypes from "../actions/actionTypes";

const initialState = {
  loggedIn: false
};

const googleAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MY_BOOKMARKS:
      return {
        ...state,
        bookmarksData: action.payload
      };
    default:
      return state;
  }
};

export default googleAuthReducer;
