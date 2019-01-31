import actionTypes from "../actionTypes";

let token = window.localStorage.getItem("token");

export const CommentError = error => ({
  type: actionTypes.COMMENTERROR,
  payload: error
});

export const CommentMessage = message => ({
  type: actionTypes.COMMENTSUCCESS,
  payload: message
});

export const CommentAction = (data, slug) => dispatch => {
  return fetch(
    `${process.env.REACT_APP_API_URL_BASE}articles/${slug}/comments/`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      CORS: "no-cors",
      body: JSON.stringify({ comment: data })
    }
  )
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        dispatch(CommentError(response.errors));
      } else {
        dispatch(CommentMessage(response));
      }
    });
};
