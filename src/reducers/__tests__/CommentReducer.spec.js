import CommentReducer from '../CommentReducer';
import actionTypes from '../../actions/actionTypes';

describe('test reducer', () => {
  it('should return the initial state unknow action type', () => {
    expect(CommentReducer(undefined, {})).toEqual({
      comment: {},
      commentList: {},
      refresh: false,
      replyList: []
    });
  });

  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.COMMENTDISLIKE,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({ comment: {}, commentList: {}, refresh: true, replyList: [] });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.COMMENTLIKE,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({ comment: {}, commentList: {}, refresh: true, replyList: [] });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.EDITCOMMENT,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({ comment: {}, commentList: {}, refresh: true, replyList: [] });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.COMMENTDELETE,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({ comment: {}, commentList: {}, refresh: true, replyList: [] });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.REPLYSUCCESS,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({ comment: {}, commentList: {}, refresh: true, replyList: [] });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.GETCOMMENT,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({
      comment: {},
      commentList: { body: 'article body', id: 1, slug: 'moked-slag' },
      refresh: false,
      replyList: []
    });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.COMMENTERROR,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({
      comment: { body: 'article body', id: 1, slug: 'moked-slag' },
      commentList: {},
      refresh: false,
      replyList: []
    });
  });
  it('should return new state on create article', () => {
    expect(
      CommentReducer(undefined, {
        type: actionTypes.COMMENTSUCCESS,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({
      comment: { body: 'article body', id: 1, slug: 'moked-slag' },
      commentList: { '1': { body: 'article body', id: 1, slug: 'moked-slag' } },
      refresh: false,
      replyList: []
    });
  });
});
