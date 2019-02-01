import actionTypes from "../actionTypes";

import { token } from "./index";

const createArticles = article => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ article: article })
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.CREATE_ARTICLE, payload: res.article });
    })
    .catch(error => error);
};

const getArticles = search_param => dispatch => {
  return fetch(
    `${actionTypes.BASEURL}articles/search?${search_param}&limit=5`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }
  )
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_ARTICLES,
        payload: res.results,
        pages: res
      });
      dispatch({
        type: actionTypes.STORE_PARAM,
        payload: search_param
      });
    })
    .catch(err => err);
};

const getSingleArticle = slug => dispatch => {
  
  
  return fetch(`${actionTypes.BASEURL}articles/${slug}`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.GET_SINGLE_ARTICLE, payload: res });
    })
    .catch(err => err);
};

const editArticle = articleData => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${articleData.slug}/`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ article: articleData })
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.EDIT_ARTICLE, payload: res.article });
    })
    .catch(err => err);
};

const deleteArticle = slug => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${slug}/`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.DELETE_ARTICLE, payload: res.article });
    })
    .catch(err => err);
};

const getMoreArticles = (page, searchParam = "") => dispatch => {
  return fetch(
    `${
      process.env.REACT_APP_API_URL_BASE
    }articles/search?${searchParam}&limit=5&page=${page}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }
  )
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_MORE_ARTICLES,
        payload: res
      });
    })
    .catch(err => err);
};

const setArticleReadCount = (slug, time) => dispatch => {
  return fetch(`${actionTypes.BASEURL}articles/${slug}/${time}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: actionTypes.READ_TIME, payload: res });
    });
};

export {
  getMoreArticles,
  createArticles,
  getArticles,
  getSingleArticle,
  editArticle,
  deleteArticle,
  setArticleReadCount
};
