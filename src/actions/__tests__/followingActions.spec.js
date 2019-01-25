import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import actionTypes from "../actionTypes";
import {
  followUser,
  unFollowUser,
  getFollowing,
  getFollowers
} from "../userFollowActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let token = window.localStorage.getItem("token");
let username = "bibang";

describe("test following actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("mock following user action", () => {
    let postData = {};
    fetchMock.postOnce(
      `${process.env.REACT_APP_API_URL_BASE}profiles/${username}/follow`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(postData)
      }
    );
    const expectedActions = [
      {
        type: actionTypes.FOLLOW_USER,
        payload: undefined
      }
    ];
    const store = mockStore({ data: {} });

    return store.dispatch(followUser(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("mock unfollowing user action", () => {
    let data = {}
    fetchMock.deleteOnce(
      `${process.env.REACT_APP_API_URL_BASE}profiles/${username}/follow`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );
    const expectedActions = [
      {
        type: actionTypes.UNFOLLOW_USER,
        payload: undefined
      }
    ];
    const store = mockStore({});

    return store.dispatch(unFollowUser(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("mock unfollowing user action", () => {
    fetchMock.getOnce(
      `${process.env.REACT_APP_API_URL_BASE}profiles/following`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: {data:[]}
      }
    )
    const store = mockStore({data:[]});

    return store.dispatch(getFollowing()).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
  it("mock unfollowing user action", () => {
    fetchMock.getOnce(
      `${process.env.REACT_APP_API_URL_BASE}profiles/followers`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: {data:[]}
      }
    )
    const store = mockStore({data:[]});

    return store.dispatch(getFollowers()).then(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
});
