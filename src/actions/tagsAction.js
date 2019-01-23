import actionTypes from "./actionTypes";

export const BACKEND_DOMAIN = process.env.REACT_APP_API_URL_BASE;
export const token = window.localStorage.getItem("token");

const getTags = () => dispatch => {
  return fetch(`${BACKEND_DOMAIN}tags`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.GET_TAGS, payload: res });
    });
};

export default getTags;
