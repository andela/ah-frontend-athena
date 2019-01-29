import { toast } from "react-toastify";

import actionTypes from "../actionTypes";

export const signupFail = data => ({
  type: actionTypes.SIGNUPFAIL,
  payload: data
});

export const signupSuccess = response => ({
  type: actionTypes.SIGNUPSUCCESS,
  payload: response
});

export const signUp = data => {
  return function(dispatch) {
    fetch(`${actionTypes.BASEURL}users/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      CORS: "no-cors",
      body: JSON.stringify({ user: data })
    })
      .then(res => res.json())
      .then(response => {
        if (response.user) {
          dispatch(signupSuccess(response.user.message));
          toast.success(response.user.message);
        } else {
          dispatch(signupFail(response.errors));
        }
      });
  };
};

export default signUp;
