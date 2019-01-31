import getMyBookmarkedArticlesReducer from "../getMyBookmarkedArticlesReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  loggedIn: false
};

let returnedData = {
  message: "Bookmarks not found"
};

describe("Tests the get bookmarks reducer", () => {
  it("it should return the bookmarksData data if the payload was defined", () => {
    let response = getMyBookmarkedArticlesReducer(initialState, {
      type: actionTypes.GET_MY_BOOKMARKS,
      payload: returnedData
    });
    expect(response).toEqual({
      bookmarksData: returnedData,
      ...initialState
    });
  });
});
