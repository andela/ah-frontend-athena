import actionTypes from "./actionTypes";

let token = window.localStorage.getItem("token");

export const getProfile = username => dispatch => {
  return fetch(`${actionTypes.BASEURL}profiles/${username}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem("userDp", data.profile.image);
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: data.profile
      });
    })
    .catch(err => err);
};

export const updateProfile = postData => dispatch => {
  return fetch(`${actionTypes.BASEURL}user/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ user: postData })
  })
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem("username", data.user.username);
      let newDp = window.localStorage.getItem("image_url");
      window.localStorage.setItem("userDp", newDp);
      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: data.user
      });
    });
};
