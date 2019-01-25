import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BookmarkAction } from "../bookmarkAction/BookmarkAction";
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
    fetchMock.post(`${actionTypes.BASEURL}articles/FAKE-SLUG/bookmark/`, {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(bookmark)
    });
    const expectedActions = [
      {
        type: actionTypes.BOOKMARK_SUCCESS,
        payload: bookmark
      }
    ];
    const store = mockStore({});

    return store.dispatch(BookmarkAction('', "FAKE-SLUG")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
