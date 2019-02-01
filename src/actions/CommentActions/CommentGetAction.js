import actionTypes from '../actionTypes';

const token = window.localStorage.getItem('token');

export const ReplySuccess = message => ({
  type: actionTypes.REPLYSUCCESS,
  payload: message
});

export const GETCOMMENT = comments => ({
  type: actionTypes.GETCOMMENT,
  payload: comments
});

export const ReplyPostAction = (id, data, slug) => dispatch => {
  return fetch(
    `${process.env.REACT_APP_API_URL_BASE}articles/${slug}/comments/${id}/`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      CORS: 'no-cors',
      body: JSON.stringify({ reply: data })
    }
  )
    .then(res => res.json())
    .then(response => {
      dispatch(ReplySuccess(response));
    });
};

export const CommentGetAction = (data, slug) => dispatch => {
  return fetch(
    `${process.env.REACT_APP_API_URL_BASE}articles/${slug}/comments/${data}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      CORS: 'no-cors'
    }
  )
    .then(res => res.json())
    .then(response => {
      if (response.comments) {
        let list = [];
        let obj = {};
        let obj2 = {};
        response.comments.forEach(element => {
          const id = element.id;
          obj[element.id] = element;
          response.comments.forEach(element => {
            if (element.parent === id) {
              if (!obj[id]['replies']) {
                obj[id]['replies'] = { [element.id]: '' };
                obj[id]['replies'][element.id] = element;
              } else {
                obj[id]['replies'][element.id] = element;
              }
            }
          });
          if (element.parent === null) {
            list.push(element);
          }
        });
        for (let index = 0; index < list.length; index++) {
          const id = list[index].id;
          if (!obj2[id]) {
            obj2[id] = list[index];
          }
        }

        dispatch(GETCOMMENT(obj2));
      }

      if (response.comment) {
        let list = [];
        response.comment.forEach(element => {
          if (element.parent === data) {
            list.push(element);
          }
        });
        dispatch(GETCOMMENT(list));
      }
    });
};
