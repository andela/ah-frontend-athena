import actionTypes from '../actionTypes';

let token = window.localStorage.getItem('token');

export const CommentError = error => ({
  type: actionTypes.COMMENTERROR,
  payload: error
});

export const CommentMessage = message => ({
  type: actionTypes.COMMENTSUCCESS,
  payload: message
});

export const CommentLike = message => ({
  type: actionTypes.COMMENTLIKE,
  payload: message
});
export const CommentDisLike = message => ({
  type: actionTypes.COMMENTDISLIKE,
  payload: message
});

export const CommentAction = (data, slug) => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${slug}/comments/`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    CORS: 'no-cors',
    body: JSON.stringify({ comment: data })
  })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        dispatch(CommentError(response.errors));
      } else {
        dispatch(CommentMessage(response));
      }
    });
};

export const CommentLikeAction = (commentId, slug) => dispatch => {
  return fetch(
    `${actionTypes.BASEURL}articles/${slug}/comments/${commentId}/like`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      CORS: 'no-cors'
    }
  )
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        dispatch(CommentError(response.errors));
      } else {
        dispatch(CommentLike(response));
      }
    });
};

export const CommentDislikeAction = (commentId, slug) => dispatch => {
  return fetch(
    `${actionTypes.BASEURL}articles/${slug}/comments/${commentId}/like`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      CORS: 'no-cors'
    }
  )
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        dispatch(CommentError(response.errors));
      } else {
        dispatch(CommentDisLike(response));
      }
    });
};
