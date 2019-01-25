import actionTypes from '../actions/actionTypes'

const initialState = {
    bookmarks: {}
}
export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.BOOKMARK_SUCCESS:
        return{...state, bookmarks: action.payload}
        case actionTypes.BOOKMARK_FAILURE:
        return{...state, bookmarks: action.payload}
        default:
        return state
    }
}