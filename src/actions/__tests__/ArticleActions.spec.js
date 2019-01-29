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

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("mock articles", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should mock create articles ", () => {
    fetchMock.postOnce(`${actionTypes.BASEURL}articles/`, {
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
      .getOnce(`${actionTypes.BASEURL}articles/search?tag=''`, {
        body: { results: [{}, {}] },
        headers: {
          "content-type": "application/json"
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

    return store.dispatch(getArticles("tag=''", "", "")).then(() => {
      expect(store.getActions()).toEqual(articleAction);
    });
  });

  it("should mock fetch  a single article ", () => {
    fetchMock
      .getOnce(`${actionTypes.BASEURL}articles/moked-slug`, {
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
      .putOnce(`${actionTypes.BASEURL}articles/${articleData.slug}/`, {
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
      .deleteOnce(`${actionTypes.BASEURL}articles/moked-slug/`, {
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
