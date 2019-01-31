import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import actionTypes from '../actionTypes';
import {
  CommentError,
  CommentMessage,
  CommentAction,
  CommentLike,
  CommentDisLike,
  CommentLikeAction,
  CommentDislikeAction
} from '../CommentActions/CommentAction';

const middlewares = [thunk];
let token = window.localStorage.getItem('token');
const mockStore = configureMockStore(middlewares);
const data = {
  comment_body: 'hey joe'
};
describe('Comment actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should mock fetch apiff', () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .postOnce(`${actionTypes.BASEURL}articles/mocked-slug/comments/`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        body: data
      })
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.COMMENTSUCCESS,
        payload: data
      }
    ];
    return store.dispatch(CommentAction(data, 'mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should mock fetch apiff', () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .postOnce(`${actionTypes.BASEURL}articles/mocked-slug/comments/`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        body: { errors: { errors: '' } }
      })
      .catch(err => err);
    const expectedActions = [
      {
        type: actionTypes.COMMENTERROR,
        payload: { errors: '' }
      }
    ];
    return store.dispatch(CommentAction(data, 'mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call CommentMessage on success comment', () => {
    const response = 'this is the comment';
    const expectedActions = [
      {
        type: actionTypes.COMMENTSUCCESS,
        payload: 'this is the comment'
      }
    ];
    const store = mockStore({ comment: {} });
    store.dispatch(CommentMessage(response));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should call Comment like', () => {
    const response = 'this is the comment';
    const expectedActions = [
      { payload: 'this is the comment', type: 'COMMENTLIKE' }
    ];
    const store = mockStore({ comment: {} });
    store.dispatch(CommentLike(response));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should call Comment dislike', () => {
    const response = 'this is the comment';
    const expectedActions = [
      { payload: 'this is the comment', type: 'COMMENTDISLIKE' }
    ];
    const store = mockStore({ comment: {} });
    store.dispatch(CommentDisLike(response));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should call CommentError ', () => {
    const failAction = [
      {
        type: actionTypes.COMMENTERROR,
        payload: 'this is an error'
      }
    ];
    const commentError = 'this is an error';
    const store = mockStore({ comment: {} });
    store.dispatch(CommentError(commentError));
    expect(store.getActions()).toEqual(failAction);
  });

  it('should mock fetch api', () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .postOnce(`${actionTypes.BASEURL}articles/mocked-slug/comments/1/like`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        body: { errors: '' }
      })
      .catch(err => err);
    const expectedActions = [{ payload: { errors: '' }, type: 'COMMENTERROR' }];
    store.dispatch(CommentLikeAction(1, 'mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should mock fetch api', () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .postOnce(`${actionTypes.BASEURL}articles/mocked-slug/comments/1/like`, {
        headers: {
          authorization: `Bearer ${token}`
        },
        body: { errors: { errors: '' } }
      })
      .catch(err => err);
    const expectedActions = [{ payload: { errors: '' }, type: 'COMMENTERROR' }];
    store.dispatch(CommentLikeAction(1, 'mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should mock fetch api w', () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .deleteOnce(
        `${actionTypes.BASEURL}articles/mocked-slug/comments/1/like`,
        {
          headers: {
            authorization: `Bearer ${token}`
          },
          body: { errors: { errors: '' } }
        }
      )
      .catch(err => err);
    const expectedActions = [{ payload: '', type: 'COMMENTDISLIKE' }];
    store.dispatch(CommentDislikeAction(1, 'mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should mock fetch api w', () => {
    const store = mockStore({ comment: {} });
    fetchMock
      .deleteOnce(
        `${actionTypes.BASEURL}articles/mocked-slug/comments/1/like`,
        {
          headers: {
            authorization: `Bearer ${token}`
          },
          body: { response: { data: '' } }
        }
      )
      .catch(err => err);
    const expectedActions = [{ payload: '', type: 'COMMENTDISLIKE' }];
    store.dispatch(CommentDislikeAction(1, 'mocked-slug')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
