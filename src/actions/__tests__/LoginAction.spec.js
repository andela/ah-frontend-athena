import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../LoginAction";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Mock the endpoint", () => {
  let loginData = {
    email: "ronad.okello@andela.com",
    password: "qwerty12345"
  };
  afterEach(() => {
    fetchMock.restore();
  });
  it("Mock the endpoint", () => {
    fetchMock.post(`${actionTypes.BASEURL}users/login/`, {
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ user: loginData })
    });
    const expectedActions = [
      {
        type: actionTypes.LOGIN,
        payload: {
          user: loginData
        }
      }
    ];
    const store = mockStore({ user: {} });

    return store.dispatch(login(loginData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
