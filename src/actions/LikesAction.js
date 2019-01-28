import actionType from "./actionTypes";
import { BACKEND_DOMAIN } from "./articleActions";

const token = window.localStorage.getItem("token");

const getLikeStatus = slug => dispatch => {
  return fetch(`${BACKEND_DOMAIN}articles/${slug}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: actionType.LOAD_LIKE_STATUS,
        payload: data
      })
    );
};

const clickLikeIcon = slug => dispatch => {
  return fetch(`${BACKEND_DOMAIN}articles/${slug}/like/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: actionType.LIKE,
        payload: data
      })
    );
};

const clickDisLikeIcon = slug => dispatch => {
  return fetch(`${BACKEND_DOMAIN}articles/${slug}/like/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: actionType.DISLIKE,
        payload: data
      })
    );
};
export { getLikeStatus, clickLikeIcon, clickDisLikeIcon };
