import actionTypes from "./actionTypes";

export const facebookLogin = access_token => dispatch => {
  return fetch(`${actionTypes.BASEURL}users/facebook/`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    CORS: "no-cors",
    body: JSON.stringify({ token: access_token })
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: actionTypes.FACEBOOK_LOGIN,
        payload: data
      })
    );
};

export default facebookLogin;
