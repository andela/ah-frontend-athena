import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { googleLogin } from "../googleLoginAction";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Google login function", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("Mocks accessing the endpoint", () => {
    let access_token = "mocked jwt token response";
    let data = { token: "mocked jwt token response" };
    fetchMock.post(`${actionTypes.BASEURL}users/google/`, {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ token: access_token })
    });
    const expectedActions = [
      {
        type: actionTypes.GOOGLE_LOGIN,
        payload: data
      }
    ];
    const store = mockStore({});

    return store.dispatch(googleLogin(access_token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
