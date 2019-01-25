import ArticleReducer from "../articleReducers/ArticleReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  article: {},
  articles: [],
  view_article: {},
  edit_article: {},
  delete_article: {},
  new_article_rate: {}
};

describe("test signup reducer", () => {
  it("should return the initial state unknow action type", () => {
    expect(ArticleReducer(undefined, {})).toEqual(initialState);
  });
  it("should return new state on create article", () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.CREATE_ARTICLE,
        payload: {
          id: 1,
          body: "article body",
          slug: "moked-slag"
        }
      })
    ).toEqual({
      article: { body: "article body", id: 1, slug: "moked-slag" },
      articles: [],
      delete_article: {},
      edit_article: {},
      view_article: {},
      new_article_rate: {}
    });
  });

  it("should return new state on get all articles article", () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.GET_ARTICLES,
        payload: [
          {
            id: 1,
            body: "article body",
            slug: "moked-slag"
          },
          {
            id: 1,
            body: "article body",
            slug: "moked-slag"
          }
        ]
      })
    ).toEqual({
      article: {},
      articles: [
        { body: "article body", id: 1, slug: "moked-slag" },
        { body: "article body", id: 1, slug: "moked-slag" }
      ],
      delete_article: {},
      edit_article: {},
      view_article: {},
      new_article_rate: {}
    });
  });

  it("should return new state on get single article", () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.GET_SINGLE_ARTICLE,
        payload: { id: 10, body: "article body", slug: "moked-slag" }
      })
    ).toEqual({
      article: {},
      articles: [],
      delete_article: {},
      edit_article: {},
      new_article_rate: {},
      view_article: { body: "article body", id: 10, slug: "moked-slag" }
    });
  });

  it("should return new state on edit single article", () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.EDIT_ARTICLE,
        payload: {
          id: 10,
          body: "article body",
          slug: "moked-slag"
        }
      })
    ).toEqual({
      article: {},
      articles: [],
      delete_article: {},
      edit_article: { body: "article body", id: 10, slug: "moked-slag" },
      view_article: {},
      new_article_rate: {}
    });
  });

  it("should return new state on delete article", () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.DELETE_ARTICLE,
        payload: { message: "Article successfully deleted" }
      })
    ).toEqual({
      article: {},
      articles: [],
      delete_article: { message: "Article successfully deleted" },
      edit_article: {},
      view_article: {},
      new_article_rate: {}
    });
  });
});
