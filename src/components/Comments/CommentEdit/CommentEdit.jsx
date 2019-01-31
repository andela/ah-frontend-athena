import React from "react";
import PropTypes from "prop-types";
import { MDBIcon } from "mdbreact";
import "./CommentEdit.scss";

const CommentEdit = ({ clickReply, clickDelete, clickEdit, id }) => {
  const handleKeyUp = () => {};
  
  return (
    <div className="reply container row">
      <div className="col-8">
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
  clickReply: PropTypes.func,
  clickDelete: PropTypes.func,
  clickEdit: PropTypes.func,
  id: PropTypes.number
};

CommentEdit.defaultProps = {
  clickReply: () => {},
  clickDelete: () => {},
  clickEdit: () => {},
  id: 0
};
export default CommentEdit;
