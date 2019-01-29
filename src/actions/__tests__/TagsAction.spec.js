import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import actionTypes from "../actionTypes";
import getTags from "../tagsAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("mock tags", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should mock fetch all tags", () => {
    fetchMock.getOnce(`${process.env.REACT_APP_API_URL_BASE}tags`, {
      body: [],
      headers: {
        "content-type": "application/json"
      }
    });

    const expectedActions = [
      {
        type: actionTypes.GET_TAGS,
        payload: []
      }
    ];
    const store = mockStore({ tags: [] });

    return store.dispatch(getTags()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
