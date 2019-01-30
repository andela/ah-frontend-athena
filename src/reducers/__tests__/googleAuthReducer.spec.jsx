import googleAuthReducer from "../googleAuthReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  loggedIn: false
};

let returnedData = {
  access_token: "mocked token"
};

describe("Tests the google auth reducer", () => {
  it("it should return the responseData data if the payload was defined", () => {
    let response = googleAuthReducer(initialState, {
      type: actionTypes.GOOGLE_LOGIN,
      payload: returnedData
    });
    expect(response).toEqual({
      responseData: returnedData,
      ...initialState,
      social: "GOOGLE_LOGIN"
    });
  });
});
