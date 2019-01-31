import actionTypes from "../actions/actionTypes";

const initialState = {
  reportedArticles: {},
  results: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REPORT_ARTICLES:
      return {
        ...state,
        results: action.payload
      };
    case actionTypes.GET_REPORTED_ARTICLES:
      return {
        ...state,
        reportedArticles: action.payload
      };
    default:
      return state;
  }
}
