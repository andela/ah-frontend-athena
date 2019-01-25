import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import actionTypes from "../actionTypes";
import { getProfile, updateProfile } from "../profileActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let username = "Josh";
let token = window.localStorage.getItem("token");
describe("Profile Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("mock get", () => {
    fetchMock.getOnce(
      `${process.env.REACT_APP_API_URL_BASE}profiles/${username}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: { profile: {} }
      }
    );
    const expectedActions = [
      {
        type: actionTypes.GET_PROFILE,
        payload: {}
      }
    ];
    const store = mockStore({ profile: {} });

    return store.dispatch(getProfile(username)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("mock post", () => {
    let postData = {};
    fetchMock.putOnce(`${actionTypes.BASEURL}user/`, {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: postData })
    });
    const expectedActions = [
      {
        type: actionTypes.UPDATE_PROFILE,
        payload: {}
      }
    ];
    const store = mockStore({});

    return store.dispatch(updateProfile(postData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
