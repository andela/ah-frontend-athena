import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  clickLikeIcon,
  clickDisLikeIcon,
  getLikeStatus
} from '../../actions/LikesAction';
import actionTypes from '../actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test like and dislike actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('Mock the endpoint to return an article', () => {
    fetchMock.getOnce(`${actionTypes.BASEURL}articles/mocked-slug`, {
      headers: {
        'content-type': 'application/json',
        authorization: ' Bearer moked-token'
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
    return store.dispatch(getLikeStatus('mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Mock the endpoint that likes', () => {
    fetchMock.postOnce(`${actionTypes.BASEURL}articles/mocked-slug/like/`, {
      headers: {
        'content-type': 'application/json',
        authorization: ' Bearer moked-token'
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
    return store.dispatch(clickLikeIcon('mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Mock the endpoint that dislikes', () => {
    fetchMock.delete(`${actionTypes.BASEURL}articles/mocked-slug/like/`, {
      headers: {
        'content-type': 'application/json',
        authorization: ' Bearer moked-token'
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
    return store.dispatch(clickDisLikeIcon('mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
