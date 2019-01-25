import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { LikeIcon, DisLikeIcon, LikeStatus } from "../../actions/LikesAction";
import actionTypes from "../actionTypes";
import { BACKEND_DOMAIN } from "../articleActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Test like and dislike actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("Mock the endpoint to return an article", () => {
    fetchMock.getOnce(`${BACKEND_DOMAIN}articles/mocked-slug`, {
      headers: {
        "content-type": "application/json",
        authorization: " Bearer moked-token"
      },
      body: { article: { like: true } }
    });
    const expectedActions = [
      {
        type: actionTypes.LOAD_LIKE_STATUS,
        payload: {
          article: { like: true }
        }
      }
    ];
    const store = mockStore({ body: {} });
    return store.dispatch(LikeStatus("mocked-slug")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("Mock the endpoint that likes", () => {
    fetchMock.postOnce(`${BACKEND_DOMAIN}articles/mocked-slug/like/`, {
      headers: {
        "content-type": "application/json",
        authorization: " Bearer moked-token"
      },
      body: {}
    });
    const expectedActions = [
      {
        type: actionTypes.LIKE,
        payload: {}
      }
    ];
    const store = mockStore();
    return store.dispatch(LikeIcon("mocked-slug")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("Mock the endpoint that dislikes", () => {
    fetchMock.delete(`${BACKEND_DOMAIN}articles/mocked-slug/like/`, {
      headers: {
        "content-type": "application/json",
        authorization: " Bearer moked-token"
      },
      body: {}
    });
    const expectedActions = [
      {
        type: actionTypes.DISLIKE,
        payload: {}
      }
    ];
    const store = mockStore();
    return store.dispatch(DisLikeIcon("mocked-slug")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
