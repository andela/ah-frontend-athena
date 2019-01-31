import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import actionTypes from "../actionTypes";
import {
  CommentError,
  CommentMessage,
  CommentAction
} from "../CommentActions/CommentAction";

const middlewares = [thunk];
let token = window.localStorage.getItem("token");
const mockStore = configureMockStore(middlewares);
const data = {
  comment_body: "hey joe"
};
describe("Comment actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should mock fetch api", () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .postOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/`,
        {
          headers: {
            authorization: `Bearer ${token}`
          },
          body: data
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.COMMENTSUCCESS,
        payload: data
      }
    ];
    return store
      .dispatch(
        CommentAction(
          data,
          'mocked-slug'
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should call CommentMessage on success comment", () => {
    const response = "this is the comment";
    const expectedActions = [
      {
        type: actionTypes.COMMENTSUCCESS,
        payload: "this is the comment"
      }
    ];
    const store = mockStore({ comment: {} });
    store.dispatch(CommentMessage(response));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should call CommentError ", () => {
    const failAction = [
      {
        type: actionTypes.COMMENTERROR,
        payload: "this is an error"
      }
    ];
    const commentError = "this is an error";
    const store = mockStore({ comment: {} });
    store.dispatch(CommentError(commentError));
    expect(store.getActions()).toEqual(failAction);
  });
});
