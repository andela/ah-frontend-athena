import actionTypes from "../actionTypes";

const token = window.localStorage.getItem("token");

export const bookmarkSuccess = response => ({
  type: actionTypes.BOOKMARK_SUCCESS,
  payload: response
});

export const BookmarkAction = (bookmark, slug) => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${slug}/bookmark/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: { bookmark: bookmark }
  })
    .then(res => res.json())
    .then(data => {
      dispatch(bookmarkSuccess(data));
    });
};

BookmarkAction.propTypes = {};

export default BookmarkAction;
