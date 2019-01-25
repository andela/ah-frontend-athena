import actionTypes from "../actionTypes";

const token = window.localStorage.getItem("token");

export const EditComment = update => ({
  type: actionTypes.EDITCOMMENT,
  payload: update
});

export const CommentEditAction = (id, slug, data) => dispatch => {
  return fetch(
    `${process.env.REACT_APP_API_URL_BASE}articles/${slug}/comments/${id}/`,
    {
      method: "PUT",
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
      dispatch(EditComment(response));
    });
};

export const CommentDeleteAction = (id, slug) => dispatch => {
  return fetch(
    `${process.env.REACT_APP_API_URL_BASE}articles/${slug}/comments/${id}/`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(res => res.json())
    .then(response => {
      dispatch({
        type: actionTypes.COMMENTDELETE,
        payload: response
      });
    });
};
