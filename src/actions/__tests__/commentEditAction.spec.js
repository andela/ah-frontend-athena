import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import actionTypes from "../actionTypes";
import {
    CommentEditAction,
} from "../CommentActions/CommentEditAction";

const middlewares = [thunk];
let token = window.localStorage.getItem("token");
const mockStore = configureMockStore(middlewares);
const data = {
  comment_body: "hey joe"
};
describe("Comment edit actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should mock put fetch api", () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .putOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2/`,
        {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body:  data 
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.EDITCOMMENT,
        payload: data
      }
    ];
    return store
      .dispatch(
          CommentEditAction(2, 'mocked-slug', data)
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
})

