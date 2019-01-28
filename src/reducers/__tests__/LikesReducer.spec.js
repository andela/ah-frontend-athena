import LikesReducer from "../LikesReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  like_status: {},
  likes: {}
};

describe("Testing likes reducer", () => {
  it("Test empty reducer", () => {
    expect(LikesReducer(undefined, {})).toEqual(initialState);
  });
  it("Test load like status", () => {
    let response = LikesReducer(initialState, {
      type: actionTypes.LOAD_LIKE_STATUS,
      payload: {}
    });
    expect(response).toEqual({ like_status: {}, likes: {} });
  });
  it("Test like reducer", () => {
    let response = LikesReducer(initialState, {
      type: actionTypes.LIKE,
      payload: {}
    });
    expect(response).toEqual({ like_status: {}, likes: {} });
  });
  it("Test dislike reducer", () => {
    let response = LikesReducer(initialState, {
      type: actionTypes.DISLIKE,
      payload: {}
    });
    expect(response).toEqual({ like_status: {}, likes: {} });
  });
});
