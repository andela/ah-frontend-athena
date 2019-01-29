import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import * as actions from "../PasswordResetAction/PasswordResetAction";
import actionTypes from "../actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("password reset actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("test password reset actions success", () => {
    fetchMock.postOnce(`${actionTypes.BASEURL}password_reset/`, {
      headers: { "content-type": "application/json" },
      body: { message: "message" }
    });
    const expectedActions = [
      {
        type: actionTypes.PASSWORD_RESET_RESULTS,
        payload: "message"
      }
    ];
    const store = mockStore();

    return store.dispatch(actions.PasswordResetAction("email")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("test password reset actions failure", () => {
    fetchMock.postOnce(`${actionTypes.BASEURL}password_reset/`, {
      headers: { "content-type": "application/json" },
      body: { errors: "errors" }
    });
    const expectedActions = [
      {
        type: actionTypes.PASSWORD_RESET_ERRORS,
        payload: "errors"
      }
    ];
    const store = mockStore();

    return store.dispatch(actions.PasswordResetAction("email")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("password reset confirm actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("test password confirm reset actions", () => {
    fetchMock.putOnce(
      `${actionTypes.BASEURL}password_reset_confirm/mocktoken`,
      {
        headers: { "content-type": "application/json" },
        body: { message: "message" }
      }
    );
    const expectedActions = [
      {
        type: actionTypes.PASSWORD_RESET_RESULTS,
        payload: "message"
      }
    ];
    const store = mockStore();

    return store
      .dispatch(actions.PasswordResetConfirmAction("mockpassword", "mocktoken"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it("test password confirm reset actions", () => {
    fetchMock.putOnce(
      `${actionTypes.BASEURL}password_reset_confirm/mocktoken`,
      {
        headers: { "content-type": "application/json" },
        body: { errors: "error message" }
      }
    );
    const expectedActions = [
      {
        type: actionTypes.PASSWORD_RESET_ERRORS,
        payload: "error message"
      }
    ];
    const store = mockStore();

    return store
      .dispatch(actions.PasswordResetConfirmAction("mockpassword", "mocktoken"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
