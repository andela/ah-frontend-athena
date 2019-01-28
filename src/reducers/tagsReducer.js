import actionTypes from "../actions/actionTypes";

const initialState = {
  tags: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TAGS:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};
