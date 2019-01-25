import actionTypes from "../actionTypes";

export const PasswordResetAction = email => dispatch => {
  return fetch(`${actionTypes.BASEURL}password_reset/`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ user: email })
  })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        dispatch({
          type: actionTypes.PASSWORD_RESET_ERRORS,
          payload: data.errors
        });
      }
      if (data.message) {
        dispatch({
          type: actionTypes.PASSWORD_RESET_RESULTS,
          payload: data.message
        });
      }
    });
};

export const PasswordResetConfirmAction = (newPassword, token) => dispatch => {
  return fetch(`${actionTypes.BASEURL}password_reset_confirm/${token}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(newPassword)
  })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        dispatch({
          type: actionTypes.PASSWORD_RESET_ERRORS,
          payload: data.errors
        });
      }
      if (data.message) {
        dispatch({
          type: actionTypes.PASSWORD_RESET_RESULTS,
          payload: data.message
        });
      }
    });
};
