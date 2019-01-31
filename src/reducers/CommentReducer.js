import actionTypes from '../actions/actionTypes';

const initialState = {
  commentList: {},
  comment: {},
  replyList: [],
  refresh: false
};

export default (state = initialState, action) => {
  const list = state.commentList;
  let comList = state.commentList;
  let ref = false;
  switch (action.type) {
    case actionTypes.COMMENTSUCCESS:
      list[action.payload.id] = action.payload;
      return { ...state, comment: action.payload, commentList: list };
    case actionTypes.COMMENTERROR:
      return { ...state, comment: action.payload };
    case actionTypes.REPLYSUCCESS:
      ref = true;
      if (!comList[action.payload.parent]) {
        ref = true;
      } else if (!comList[action.payload.parent]['replies']) {
        comList[action.payload.parent]['replies'] = { [action.payload.id]: '' };
        comList[action.payload.parent]['replies'][action.payload.id] =
          action.payload;
      } else {
        comList[action.payload.parent]['replies'][action.payload.id] =
          action.payload;
      }
      return { ...state, commentList: comList, refresh: ref };
    case actionTypes.GETCOMMENT:
      return { ...state, commentList: action.payload, refresh: false };
    case actionTypes.COMMENTDELETE:
      return { ...state, refresh: true };
    case actionTypes.EDITCOMMENT:
      return { ...state, refresh: true };
    case actionTypes.COMMENTLIKE:
      return { ...state, refresh: true };
    case actionTypes.COMMENTDISLIKE:
      return { ...state, refresh: true };
    default:
      return state;
  }
};
