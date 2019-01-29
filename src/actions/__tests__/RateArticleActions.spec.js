import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import actionTypes from "../actionTypes";
import rateArticle from "../articleActions/RateArticleActions";
import { getSingleArticle } from "../articleActions/ArticleActions";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("mock articles", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should mock create articles ", () => {
    fetchMock.postOnce(`${actionTypes.BASEURL}articles/moked-slug/rate/`, {
      body: { rating: 4 },
      headers: {
        "content-type": "application/json",
        authorization: " Bearer moked-token"
      }
    });

    const expectedActions = [
      {
        type: actionTypes.RATE_ARTICLE,
        payload: { rating: 4 }
      }
    ];
    const store = mockStore({ article: {} });

    return store.dispatch(rateArticle(4, "moked-slug")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
