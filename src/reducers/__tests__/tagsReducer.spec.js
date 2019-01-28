import actionTypes from "../../actions/actionTypes";
import tagsReducer from "../tagsReducer";

const initialState = {
  tags: []
};

describe("test tags reducer", () => {
  it("should return the initial state unknown action type", () => {
    expect(tagsReducer(undefined, [])).toEqual(initialState);
  });
  it("should return new state on fetch all tags", () => {
    expect(
      tagsReducer(undefined, {
        type: actionTypes.GET_TAGS,
        payload: ["magic", "andela", "javscript"]
      })
    ).toEqual({ tags: ["magic", "andela", "javscript"] });
  });
});
