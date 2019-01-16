import { LOGIN } from './actionTypes';

export const login = (loginData) => dispatch => {
    return fetch( 'https://ah-backend-athena-staging.herokuapp.com/api/users/login/', {method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify({user: loginData})})
    .then(res => res.json())
    .then(data => dispatch({
        type: LOGIN,
        payload: data
    }));
}

export default login;
