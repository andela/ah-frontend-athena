import facebookAuthReducer from "../facebookAuthReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  loggedIn: false
};

let returnedData = {
  access_token: "mocked token"
};

describe("Tests the facebook auth reducer", () => {
  it("it should return the responseData data if the payload was defined", () => {
    let response = facebookAuthReducer(initialState, {
      type: actionTypes.FACEBOOK_LOGIN,
      payload: returnedData
    });
    expect(response).toEqual({
      responseData: returnedData,
      ...initialState,
      social: "FACEBOOK_LOGIN"
    });
  });
});
