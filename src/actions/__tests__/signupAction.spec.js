import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import actionTypes from "../actionTypes";
import {
  signupSuccess,
  signUp,
  signupFail
} from "../signupAction/signupAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("signup actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should mock fetch api", () => {
    const store = mockStore({ user: {} });
    fetchMock.postOnce(`${actionTypes.BASEURL}users/`, {
      headers: {
        "content-type": "application/json"
      },
      body: {
        user: {
          username: "kasule",
          email: "joseph@gmail.com",
          password: "Kasl12223"
        }
      }
    });
    store.dispatch(signUp());
    expect(store.getActions()).toEqual([]);
  });

  it("should fetch SIGNUPSUCESS when registering user", () => {
    const response = "A verification link has been sent to joseph@gmail.com";
    const expectedActions = [
      {
        type: actionTypes.SIGNUPSUCCESS,
        payload: "A verification link has been sent to joseph@gmail.com"
      }
    ];
    const store = mockStore({ user: {} });
    store.dispatch(signupSuccess(response));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should fetch SIGNUPFAILURE for unregistered user ", () => {
    const failAction = [
      {
        type: actionTypes.SIGNUPFAIL,
        payload: "username must be between 3 to 10 characters"
      }
    ];
    const usernameError = "username must be between 3 to 10 characters";
    const store = mockStore({ user: {} });
    store.dispatch(signupFail(usernameError));
    expect(store.getActions()).toEqual(failAction);
  });
});
