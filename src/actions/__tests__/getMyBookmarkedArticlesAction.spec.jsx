import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getMyBookmarkedArticlesAction } from "../getMyBookmarkedArticlesAction";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Mock fetching bookmarks", () => {
  let returnedData = {
    message: "Bookmarks not found"
  };
  afterEach(() => {
    fetchMock.restore();
  });
  it("should return the expected action result", () => {
    fetchMock.get(`${actionTypes.BASEURL}article/bookmarks/`, {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(returnedData)
    });
    const expectedActions = [
      {
        type: actionTypes.GET_MY_BOOKMARKS,
        payload: returnedData
      }
    ];
    const store = mockStore({});

    return store
      .dispatch(getMyBookmarkedArticlesAction("mocked token"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
