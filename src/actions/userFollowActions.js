import actionTypes from "./actionTypes";

let token = window.localStorage.getItem("token");

export const followUser = username => dispatch => {
  return fetch(
    `${process.env.REACT_APP_API_URL_BASE}profiles/${username}/follow`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }
    }
  )
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: actionTypes.FOLLOW_USER,
        payload: data.profile
      });
    })
    .catch(err => err);
};

export const unFollowUser = username => dispatch => {
  return fetch(`${process.env.REACT_APP_API_URL_BASE}profiles/${username}/follow`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: actionTypes.UNFOLLOW_USER,
        payload: data.profile
      });
    })
    .catch(err => err);
};

export const getFollowing = () => dispatch => {
  return fetch(`${process.env.REACT_APP_API_URL_BASE}profiles/following`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: actionTypes.GET_FOLLOWING,
        payload: data.profile.following
      });
    })
    .catch(err => err);
};

export const getFollowers = () => dispatch => {
  return fetch(`${process.env.REACT_APP_API_URL_BASE}profiles/followers`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: actionTypes.GET_FOLLOWERS,
        payload: data.profile.followers
      });
    })
    .catch(err => err);
};
