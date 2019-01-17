import actionTypes from "./actionTypes";

//just before dispatching the network call, dispatch the LOADING action and get a loader started to show progress
export const googleLogin = access_token => dispatch => {
  return fetch(`${process.env.REACT_APP_API_URL_BASE}users/google/`, {
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
