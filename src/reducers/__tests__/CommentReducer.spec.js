import actionTypes from "../../actions/actionTypes";
import CommentReducer from "../CommentReducer";

const initialState = {
  commentList: {},
  comment: {},
  replyList: [],
  refresh: false
};
describe("test comment reducer", () => {
  it("should return the initial state given unknow action type", () => {
    expect(CommentReducer(undefined, {})).toEqual(initialState);
  });
  it("should return unathorized user error for COMMENTERROR type", () => {
    const type = actionTypes.COMMENTERROR;
    const commentError = CommentReducer(undefined, {
      type: type,
      payload: { comment: { Error: "unauthorized user" } }
    });
    expect(commentError["comment"]).toEqual({
      comment: { Error: "unauthorized user" }
    });
  });
  it("should return new comment on SIGNUPSUCCESS type", () => {
    const newComment = {
      comment: { comment_body: "this is the comment" },
      commentList: { comments: { comment_body: "this is the comment" } }
    };
    expect(
      CommentReducer(undefined, {
        type: actionTypes.COMMENTSUCCESS,
        payload: newComment
      })
    ).toMatchObject({ comment: newComment });
  });

  it("should return reply on REPLYSUCCESS type", () => {
    const reply = {
      commentList: { comment: "comment to reply to" },
      replyList: [{ replies: { comment_body: "this is a reply to a comment" } }]
    };
    const replySucces = CommentReducer(
      undefined,
      { type: actionTypes.REPLYSUCCESS, payload: reply }
    );
    expect(replySucces['commentList']).toMatchObject({"undefined": {"comment": {"comment_body": "this is the comment"}}});
  });

  it("should get all comments with GETCOMMENT type", () => {
    const type = actionTypes.GETCOMMENT;
    const comments= CommentReducer(undefined,{
      type: type,
      payload: { comment: { comment_body: "unauthorized user" } }
    });
    expect(Object.keys(comments['commentList']).length).toEqual(1)
  });

  it("should delete a comment with COMMENTDELETE type", () => {
    const type = actionTypes.COMMENTDELETE;
    const comments= CommentReducer(undefined, {type: type });
    expect((comments['refresh'])).toBe(true)
  });

  it("should edit a comment with EDITCOMMENT type", () => {
    const type = actionTypes.EDITCOMMENT;
    const comments= CommentReducer(undefined, {type: type});
    expect((comments['refresh'])).toBe(true)
  });

});
