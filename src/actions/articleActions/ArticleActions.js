import actionTypes from "../actionTypes";

import { BACKEND_DOMAIN, token } from "./index";

const createArticles = article => dispatch => {
  return fetch(`${BACKEND_DOMAIN}articles/`, {
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

const getArticles = () => dispatch => {
  return fetch(`${BACKEND_DOMAIN}articles?limit=5`, {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: actionTypes.GET_ARTICLES,
        payload: res.articles.results,
        pages: res.articles
      });
    })
    .catch(err => err);
};

const getSingleArticle = slug => dispatch => {
  return fetch(`${BACKEND_DOMAIN}articles/${slug}`, {
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
  return fetch(`${BACKEND_DOMAIN}articles/${articleData.slug}/`, {
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
  return fetch(`${BACKEND_DOMAIN}articles/${slug}/`, {
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

export {
  createArticles,
  getArticles,
  getSingleArticle,
  editArticle,
  deleteArticle
};
