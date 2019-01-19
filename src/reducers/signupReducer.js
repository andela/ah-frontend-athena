import actionTypes from '../actions/actionTypes'

const initialState = {
    user: {}
}
export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.SIGNUPFAIL:
        return{...state, user: action.payload}
        case actionTypes.SIGNUPSUCCESS:
        return{...state, user: action.payload}
        default:
        return state
    }
}
