import actionTypes from "../actions/actionTypes";

const initialState = {
  my_articles: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MY_ARTICLES:
      return {
        ...state,
        my_articles: action.payload
      };
    default:
      return state;
  }
}
