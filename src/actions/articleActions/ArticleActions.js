import { CREATE_ARTICLE } from '../actionTypes';

const createtArticles = (article) => dispatch => {
  
  console.log(article)
  fetch("http://127.0.0.1:8000/api/articles/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6ImhlbnJ5MSIsImV4cCI6MTU0NzYzOTE4OH0.cHetln69ph1woizIw-Ip10sO_AAyyw6gIozWAO3pTTo"
    },
    body: JSON.stringify({ article: article })
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);

      dispatch({ type: CREATE_ARTICLE, payload: res.articles.results });
    })
    .catch(err => console.log(err))
};

export {createtArticles}
