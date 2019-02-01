import React from 'react';
import PropTypes from 'prop-types';
import { MDBCard, MDBCardBody, MDBContainer, MDBBadge } from 'mdbreact';
import CommentEdit from '../CommentEdit/CommentEdit';
import Reply from './ReplyList';
import ReplyBox from '../../../views/CommentView/ReplyBox/ReplyBox';

const LoadNoReply = ({
  comment,
  id,
  clickEdit,
  clickDelete,
  clickReply,
  parentId,
  isEdit,
  childId,
  showComBox,
  username,
  clickLike,
  clickDisLike
}) => {
  return (
    <div>
      <MDBContainer fluid className="mw-75 ml-5 p-0 mx-1 my-3">
        <MDBCard className="mw-75 p-0 m-0">
          <MDBCardBody className="mw-75 m-0 p-2 ">
            <h6 className="comment-body mb-0 col-12">{comment.comment_body}</h6>
            <div className="col-3 user-info  offset-9 border border-white">
              <div className="date">
                <MDBBadge color="light" className="mr-2">
                  {comment.dateHour}
                </MDBBadge>
                Hours ago
              </div>
              <div className="mdc-chip">
                <img
                  src={`${comment.author.image}`}
                  className="img-fluid z-depth-1 square mr-2  rounded-circle"
                  alt="Contact Person"
                />
                {username}
              </div>
            </div>
          </MDBCardBody>
          <CommentEdit
            likes={comment.likes_count}
            clickEdit={clickEdit}
            clickLike={clickLike}
            clickDisLike={clickDisLike}
            clickDelete={clickDelete}
            id={id}
            clickReply={clickReply}
          />
          <Reply parentId={id} replyList={{}} />
          <div className={showComBox}>
            <ReplyBox isEdit={isEdit} parentId={parentId} childId={childId} />
          </div>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

LoadNoReply.propTypes = {
  comment: PropTypes.shape({}),
  id: PropTypes.number.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  clickReply: PropTypes.func.isRequired,
  parentId: PropTypes.number,
  isEdit: PropTypes.bool.isRequired,
  childId: PropTypes.number,
  showComBox: PropTypes.func.isRequired,
  username: PropTypes.string,
  clickLike: PropTypes.func.isRequired,
  clickDisLike: PropTypes.func.isRequired
};

LoadNoReply.defaultProps = {
  comment: {},
  parentId: 1,
  childId: 1,
  username: ''
};

export default LoadNoReply;
