import actionTypes from '../actions/actionTypes';

const initialState = {
  data: {},
}

export default function(state=initialState, action){
      switch(action.type){
        case actionTypes.GET_PROFILE:
        
        return {
          ...state,
          data: action.payload
        }
        case actionTypes.UPDATE_PROFILE:        
        return {
          ...state,
          data:{username:action.payload.username, email:action.payload.email,bio:state.data.bio, image:window.localStorage.getItem('userDp')} 
        }
        default:
         return state;
      }
}