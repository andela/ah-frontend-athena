import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import actionTypes from "../actionTypes";
import {
  createArticles,
  getArticles,
  getSingleArticle,
  editArticle,
  deleteArticle
} from "../articleActions/ArticleActions";
import { BACKEND_DOMAIN } from "../articleActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("mock articles", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should mock create articles ", () => {
    fetchMock.postOnce(`${BACKEND_DOMAIN}articles/`, {
      body: { article: {} },
      headers: {
        "content-type": "application/json",
        authorization: " Bearer moked-token"
      }
    });

    const expectedActions = [
      {
        type: actionTypes.CREATE_ARTICLE,
        payload: {}
      }
    ];
    const store = mockStore({ article: {} });

    return store
      .dispatch(createArticles({ article: { title: "title" } }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should mock fetch articles ", () => {
    fetchMock
      .getOnce(`${BACKEND_DOMAIN}articles`, {
        body: { articles: { results: [{}, {}] } },
        headers: {
          "content-type": "application/json",
          authorization: "Bearer moked-token"
        }
      })
      .catch(err => err);

    const articleAction = [
      {
        type: actionTypes.GET_ARTICLES,
        payload: [{}, {}]
      }
    ];
    const store = mockStore({ article: {} });

    return store.dispatch(getArticles()).then(() => {
      expect(store.getActions()).toEqual(articleAction);
    });
  });

  it("should mock fetch  a single article ", () => {
    fetchMock
      .getOnce(`${BACKEND_DOMAIN}articles/moked-slug`, {
        body: {},
        headers: {
          "content-type": "application/json",
          authorization: "Bearer moked-token"
        }
      })
      .catch(err => err);

    const articleAction = [
      {
        type: actionTypes.GET_SINGLE_ARTICLE,
        payload: {}
      }
    ];
    const store = mockStore();

    return store.dispatch(getSingleArticle("moked-slug")).then(() => {
      expect(store.getActions()).toEqual(articleAction);
    });
  });

  it("should mock edit an article ", () => {
    const articleData = {
      title: "this title",
      slug: "moked-slug",
      body: "moked-body"
    };
    fetchMock
      .putOnce(`${BACKEND_DOMAIN}articles/${articleData.slug}/`, {
        body: { article: {} },
        headers: {
          "content-type": "application/json",
          authorization: "Bearer moked-token"
        }
      })
      .catch(err => err);

    const articleAction = [
      {
        type: actionTypes.EDIT_ARTICLE,
        payload: {}
      }
    ];
    const store = mockStore();

    return store.dispatch(editArticle(articleData)).then(() => {
      expect(store.getActions()).toEqual(articleAction);
    });
  });

  it("should mock delete an article ", () => {
    fetchMock
      .deleteOnce(`${BACKEND_DOMAIN}articles/moked-slug/`, {
        body: { article: {} },
        headers: {
          "content-type": "application/json",
          authorization: "Bearer moked-token"
        }
      })
      .catch(err => err);

    const articleAction = [
      {
        type: actionTypes.DELETE_ARTICLE,
        payload: {}
      }
    ];
    const store = mockStore();

    return store.dispatch(deleteArticle("moked-slug")).then(() => {
      expect(store.getActions()).toEqual(articleAction);
    });
  });
});
