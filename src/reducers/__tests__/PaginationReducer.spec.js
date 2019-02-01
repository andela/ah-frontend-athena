import ArticleReducer from "../articleReducers/ArticleReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  articles: [],
  currentPage: 1,
  totalPages: 1
};

describe("password reset reducer", () => {
  it("should test an empty reducer", () => {
    expect(ArticleReducer(undefined, {})).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: "",
      totalPages: 1,
      view_article: {},
      readtime: {}
    });
  });
  it("should test updated state", () => {
    const newState = {
      articles: [],
      currentPage: 1,
      totalPages: 1
    };
    expect(
      ArticleReducer([], {
        type: actionTypes.GET_MORE_ARTICLES,
        payload: newState
      })
    ).toMatchObject({
      articles: undefined,
      currentPage: undefined,
      totalPages: undefined
    });
  });
});
