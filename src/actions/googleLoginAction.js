import actionTypes from "./actionTypes";

export const googleLogin = access_token => dispatch => {
  return fetch(`${actionTypes.BASEURL}users/google/`, {
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
        type: actionTypes.GOOGLE_LOGIN,
        payload: data
      })
    );
};

export default googleLogin;
