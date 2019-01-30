import actionTypes from "./actionTypes";

export const getMyBookmarkedArticlesAction = token => dispatch => {
  return fetch(`${actionTypes.BASEURL}article/bookmarks/`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    CORS: "no-cors"
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: actionTypes.GET_MY_BOOKMARKS,
        payload: data
      })
    );
};

export default getMyBookmarkedArticlesAction;
