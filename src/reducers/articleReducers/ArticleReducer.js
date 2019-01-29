import actionTypes from "../../actions/actionTypes";

const initialState = {
  article: {},
  articles: [],
  view_article: {},
  edit_article: {},
  delete_article: {},
  new_article_rate: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ARTICLE:
      return { ...state, article: action.payload };
    case actionTypes.GET_ARTICLES:
      return { ...state, articles: action.payload };
    case actionTypes.GET_SINGLE_ARTICLE:
      return { ...state, view_article: action.payload };
    case actionTypes.EDIT_ARTICLE:
      return { ...state, edit_article: action.payload };
    case actionTypes.DELETE_ARTICLE:
      return { ...state, delete_article: action.payload };
    case actionTypes.RATE_ARTICLE:
      return { ...state, new_article_rate: action.payload };
    default:
      return state;
  }
};
