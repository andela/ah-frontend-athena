import actionTypes from "./actionTypes";

export const login = loginData => dispatch => {
  return fetch(`${actionTypes.BASEURL}users/login/`, {
    method: "POST",

    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ user: loginData })
  })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: actionTypes.LOGIN,
        payload: data
      });
    });
};

export default login;
