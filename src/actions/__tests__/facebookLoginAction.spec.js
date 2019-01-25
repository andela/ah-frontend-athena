import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { facebookLogin } from "../facebookLoginAction";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Facebook login function", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("Mocks accessing the endpoint", () => {
    let access_token = "mocked jwt token response";
    let data = { token: "mocked jwt token response" };
    fetchMock.post(`${actionTypes.BASEURL}users/facebook/`, {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ token: access_token })
    });
    const expectedActions = [
      {
        type: actionTypes.FACEBOOK_LOGIN,
        payload: data
      }
    ];
    const store = mockStore({});

    return store.dispatch(facebookLogin(access_token)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
