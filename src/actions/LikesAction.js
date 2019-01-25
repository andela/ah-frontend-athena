import actionType from "./actionTypes";
import { BACKEND_DOMAIN } from "./articleActions";

const token = window.localStorage.getItem("token");

const LikeStatus = slug => dispatch => {
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

const LikeIcon = slug => dispatch => {
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

const DisLikeIcon = slug => dispatch => {
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
export { LikeStatus, LikeIcon, DisLikeIcon };
