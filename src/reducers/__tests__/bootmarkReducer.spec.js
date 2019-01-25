import bookmarkReducer from "../bookmarkReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
};

let message = {
  message: "Bookmarks not found"
};

describe("Tests bookmark and un bookmark reducer", () => {
  it("it should return the bookmarks data on bookmark success action type", () => {
    let response = bookmarkReducer(initialState, {
      type: actionTypes.BOOKMARK_SUCCESS,
      payload: message
    });
    expect(response).toEqual({
      bookmarks: message,
      ...initialState
    });
  });
  it("it should return the bookmarks data on bookmark failure action type", () => {
    let response = bookmarkReducer(initialState, {
      type: actionTypes.BOOKMARK_FAILURE,
      payload: message
    });
    expect(response).toEqual({
      bookmarks: message,
      ...initialState
    });
  });
});
