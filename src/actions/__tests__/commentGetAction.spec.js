import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import actionTypes from "../actionTypes";
import { CommentDeleteAction } from "../CommentActions/CommentEditAction";
import {
  CommentGetAction,
  ReplyPostAction
} from "../CommentActions/CommentGetAction";

const middlewares = [thunk];
let token = window.localStorage.getItem("token");
const mockStore = configureMockStore(middlewares);
const comments = {
  comments: [
    {
      id: 1,
      parent: 1
    }
  ]
};
describe("Comment get reply actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should mock delete api", () => {
    fetchMock
      .delete(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer mocked-token`
          },
          body: { comment: "" }
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.COMMENTDELETE,
        payload: { comment: "" }
      }
    ];
    const store = mockStore({});
    return store.dispatch(CommentDeleteAction(2, "mocked-slug")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("post reply actions to action", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should post a reply to a comment", () => {
    fetchMock
      .postOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2/`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer mocked-token`
          },
          body: { comment: {} }
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.REPLYSUCCESS,
        payload: { comment: {} }
      }
    ];
    const store = mockStore({});
    return store
      .dispatch(ReplyPostAction(2, { comment: {} }, "mocked-slug"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("Comment get actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("should mock get fetch api", () => {
    const store = mockStore({});
    fetchMock
      .getOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: comments
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.GETCOMMENT,
        payload: {}
      }
    ];
    return store
      .dispatch(CommentGetAction(2, "mocked-slug", { comment: comments }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should mock replies which have parents", () => {
    const store = mockStore({});
    const reply = {
      comments: [
        {
          id: 1,
          parent: 1,
          replies: [
            {
              id: 1
            }
          ]
        }
      ]
    };
    fetchMock
      .getOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: reply
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.GETCOMMENT,
        payload: {}
      }
    ];
    return store
      .dispatch(CommentGetAction(2, "mocked-slug", { comment: reply }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should mock replies which dont have parents", () => {
    const store = mockStore({});
    const reply = {
      comments: [
        {
          id: 1,
          parent: null,
          replies: [
            {
              id: 1
            }
          ]
        }
      ]
    };
    fetchMock
      .getOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: reply
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.GETCOMMENT,
        payload: {"1": {"id": 1, "parent": null, "replies": [{"id": 1}]}}
      }
    ];
    return store
      .dispatch(CommentGetAction(2, "mocked-slug", { comment: reply }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("should mock get a single comment", () => {
    const store = mockStore({});
    const reply = {
      comment: [
        {
          id: 1,
          parent: comments,
          replies: [
            {
              id: 1
            }
          ]
        }
      ]
    };
    fetchMock
      .getOnce(
        `${process.env.REACT_APP_API_URL_BASE}articles/mocked-slug/comments/2`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: reply
        }
      )
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.GETCOMMENT,
        payload: []
      }
    ];
    return store
      .dispatch(CommentGetAction(2, "mocked-slug", { comment: reply }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
