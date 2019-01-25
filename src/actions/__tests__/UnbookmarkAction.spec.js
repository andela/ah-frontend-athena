import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { UnBookmarkAction } from "../bookmarkAction/UnbookmarkAction";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test post bookmark actions", () => {
  let bookmark = {
    message: "Article has been bookmarked"
  };
  afterEach(() => {
    fetchMock.restore();
  });
  it("should return action type", () => {
    fetchMock.delete(`${actionTypes.BASEURL}articles/bookmark/2/`, {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(bookmark)
    });
    const expectedActions = [
      {
        type: actionTypes.BOOKMARK_FAILURE,
        payload: bookmark
      }
    ];
    const store = mockStore({});

    return store.dispatch(UnBookmarkAction(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
