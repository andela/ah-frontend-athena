import React from 'react';
import PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';
import './CommentEdit.scss';

const CommentEdit = ({
  likes,
  clickLike,
  clickDisLike,
  clickReply,
  clickDelete,
  clickEdit,
  id
}) => {
  const handleKeyUp = () => {};
  let dislikeClass = 'text-primary m-1';
  if (likes <= 0) {
    dislikeClass = dislikeClass + ' d-none';
  }

  return (
    <div className="reply container row">
      <div className="col-8">
        <div className="m-1 border rounded">
          <span className="m-3">{likes}</span>
          <span
            id="like"
            onClick={() => {
              clickLike(id);
            }}
            onKeyUp={handleKeyUp}
            role="button"
            tabIndex="0"
            className="text-primary m-1"
          >
            <MDBIcon icon="thumbs-up" />
            &nbsp;&nbsp;
          </span>
          <span
            id="dislike"
            onClick={() => {
              clickDisLike(id);
            }}
            onKeyUp={handleKeyUp}
            role="button"
            tabIndex="0"
            className={dislikeClass}
          >
            <MDBIcon icon="thumbs-down" />
            &nbsp;&nbsp;
          </span>
        </div>
        <span
          id="reply"
          onClick={() => {
            clickReply();
          }}
          onKeyUp={handleKeyUp}
          role="button"
          tabIndex="0"
          className="text-primary"
        >
          <MDBIcon icon="reply" />
          reply&nbsp;&nbsp;
        </span>
        <span
          id="edit"
          onClick={() => {
            clickEdit(id);
          }}
          onKeyUp={handleKeyUp}
          role="button"
          tabIndex="0"
          className="text-primary"
        >
          <MDBIcon icon="edit" />
          Edit&nbsp;&nbsp;
        </span>
        <span
          id="delete"
          onClick={() => {
            clickDelete(id);
          }}
          onKeyUp={handleKeyUp}
          role="button"
          tabIndex="0"
          className="text-primary"
        >
          <MDBIcon icon="trash" />
          delete&nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
};

CommentEdit.propTypes = {
  clickReply: PropTypes.func.isRequired,
  clickDelete: PropTypes.func.isRequired,
  clickEdit: PropTypes.func.isRequired,
  clickDisLike: PropTypes.func.isRequired,
  clickLike: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired
};

export default CommentEdit;
