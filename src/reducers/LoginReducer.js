import { LOGIN } from '../actions/actionTypes';

const initialState = {
    login: {}
};

export default function (state = initialState, action){
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                login: action.payload
            }
        default:
            return state;    
    }
}