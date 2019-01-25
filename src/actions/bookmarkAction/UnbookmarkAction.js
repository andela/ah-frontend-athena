import actionTypes from "../actionTypes";

const token = window.localStorage.getItem("token");

export const unbookmark = data => ({
  type: actionTypes.BOOKMARK_FAILURE,
  payload: data
});


export const UnBookmarkAction = (id) => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/bookmark/${id}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
    .then(res => res.json())
    .then(data => {
      dispatch(unbookmark(data));
    });
};

UnBookmarkAction.propTypes = {};

export default UnBookmarkAction;