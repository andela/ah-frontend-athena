import actionTypes from "../../actions/actionTypes";

const initialState = {
  article: {},
  articles: [],
  view_article: {},
  edit_article: {},
  delete_article: {},
  new_article_rate: {},
  fullArticle: {},
  searchParam: "",
  currentPage: 1,
  totalPages: 1,
  readtime: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ARTICLE:
      return { ...state, article: action.payload };
    case actionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
        fullArticle: action.pages,
        totalPages: action.pages.total_pages,
        currentPage: action.pages.current_page
      };
    case actionTypes.GET_SINGLE_ARTICLE:
      return { ...state, view_article: action.payload };
    case actionTypes.EDIT_ARTICLE:
      return { ...state, edit_article: action.payload };
    case actionTypes.DELETE_ARTICLE:
      return { ...state, delete_article: action.payload };
    case actionTypes.RATE_ARTICLE:
      return { ...state, new_article_rate: action.payload };
    case actionTypes.TAGGED_ARTICALS:
      return { ...state, articles: action.payload };
    case actionTypes.STORE_PARAM:
      return { ...state, searchParam: action.payload };
    case actionTypes.GET_MORE_ARTICLES:
      return {
        ...state,
        articles: action.payload.results,
        currentPage: action.payload.current_page,
        totalPages: action.payload.total_pages
      };
    case actionTypes.READ_TIME:
      return { ...state, readtime: action.payload };
    default:
      return state;
  }
};
