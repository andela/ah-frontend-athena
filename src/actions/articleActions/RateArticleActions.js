import actionTypes from "../actionTypes";

import { token } from "./index";

const rateArticle = (rate, slug) => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${slug}/rate/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ rating: rate })
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.RATE_ARTICLE, payload: res });
    })
    .catch(error => error);
};

export default rateArticle;
