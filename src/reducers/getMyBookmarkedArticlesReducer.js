import actionTypes from "../actions/actionTypes";

const initialState = {
  loggedIn: false,
  refresh: false,
  bookmarksData:[]
};

const googleAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MY_BOOKMARKS:
      return {
        ...state,
        refresh: false,
        bookmarksData: action.payload
      };
    case actionTypes.BOOKMARK_SUCCESS:
      return { ...state, refresh: true };
    case actionTypes.BOOKMARK_FAILURE:
      return { ...state,  refresh: true };
    default:
      return state;
  }
};

export default googleAuthReducer;
