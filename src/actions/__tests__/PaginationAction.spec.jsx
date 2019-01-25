import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../articleActions/ArticleActions";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("pagination", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("test fetching api", () => {
    fetchMock.getOnce(
      `${
        process.env.REACT_APP_API_URL_BASE
      }articles/search?&limit=5&page=1`,
      {
        headers: { "content-type": "application/json" },
        body: {}
      }
    );
    const expectedActions = [
      {
        type: actionTypes.GET_MORE_ARTICLES,
        payload: {}
      }
    ];
    const store = mockStore();

    return store.dispatch(actions.getMoreArticles(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    }).catch(err => err)
  });
});
