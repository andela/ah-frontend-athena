import actionTypes from "./actionTypes";

let token = window.localStorage.getItem("token");

export const ReportArticleAction = (slug, reason) => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${slug}/report/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ report: { reason: reason } })
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: actionTypes.REPORT_ARTICLES,
        payload: data
      });
    });
};

export const GetReportedAction = () => dispatch => {
  return fetch(`${actionTypes.BASEURL}reported/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      return dispatch({
        type: actionTypes.GET_REPORTED_ARTICLES,
        payload: data.reported
      });
    });
};
