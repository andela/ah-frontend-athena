import React from 'react';
import PropTypes from 'prop-types';
import { MDBCard, MDBCardBody, MDBContainer, MDBBadge } from 'mdbreact';
import CommentEdit from '../CommentEdit/CommentEdit';
import ReplyBox from '../../../views/CommentView/ReplyBox/ReplyBox';
import ReplyList from '../ReplyList/ReplyList';

export const LoadReply = ({
  comment,
  id,
  clickEdit,
  clickDelete,
  clickReply,
  onClick,
  CommentEditAction,
  onClick2,
  onKeyUp,
  repliesShow,
  onSubmitReply,
  parentId,
  replyList,
  CommentDeleteAction,
  isEdit,
  parentId2,
  childId,
  showReplies,
  showComBox,
  art_slug,
  username,
  img,
  clickLike,
  clickDisLike,
  history
}) => {
  return (
    <div>
      <MDBContainer className="mt-3 p-0 m-0">
        <MDBCard className="mw-80">
          <MDBCardBody className="mw-100">
            <h6 className="comment-body">{comment.comment_body}</h6>
            <div className="col-3 user-info  offset-9 border border-white">
              <div className="date">
                <MDBBadge color="light" className="mr-2">
                  {comment.dateHour}
                </MDBBadge>
                Hours ago
              </div>
              <div className="mdc-chip">
                <img
                  src={'' + img}
                  className="img-fluid z-depth-1 square mr-2  rounded-circle"
                  alt="Contact Person"
                />
                {username}
              </div>
            </div>
            <CommentEdit
              id={id}
              likes={comment.likes_count}
              clickLike={clickLike}
              clickDisLike={clickDisLike}
              clickEdit={clickEdit}
              clickDelete={clickDelete}
              clickReply={clickReply}
              onClick={onClick}
              CommentEditAction={CommentEditAction}
            />
            <div
              onClick={onClick2}
              onKeyUp={onKeyUp}
              role="button"
              tabIndex="0"
              className="col-4 text-primary"
            >
              view all...
            </div>
            <div className={showReplies}>
              <ReplyList
                history={history}
                repliesShow={repliesShow}
                slug={art_slug}
                onSubmitReply={onSubmitReply}
                parentId={parentId}
                replyList={replyList}
                CommentDeleteAction={CommentDeleteAction}
              />
            </div>
            <div className={showComBox}>
              <ReplyBox
                isEdit={isEdit}
                parentId={parentId2}
                childId={childId}
                art_slug={art_slug}
              />
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};
LoadReply.propTypes = {
  comment: PropTypes.shape({}),
  id: PropTypes.number.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  clickReply: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  CommentEditAction: PropTypes.func.isRequired,
  onClick2: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  repliesShow: PropTypes.func.isRequired,
  onSubmitReply: PropTypes.func.isRequired,
  parentId: PropTypes.number,
  replyList: PropTypes.shape([]),
  CommentDeleteAction: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  parentId2: PropTypes.number,
  childId: PropTypes.number,
  showReplies: PropTypes.func.isRequired,
  showComBox: PropTypes.func.isRequired,
  clickDisLike: PropTypes.func.isRequired,
  clickLike: PropTypes.func.isRequired,
  art_slug: PropTypes.string,
  username: PropTypes.string,
  img: PropTypes.string,
  history: PropTypes.func.isRequired
};
LoadReply.defaultProps = {
  comment: {},
  onKeyUp: () => {},
  parentId: 1,
  replyList: [],
  parentId2: 1,
  childId: 1,
  art_slug: 'mock-slug1',
  username: 'kasule',
  img: 'url'
};
export default LoadReply;
