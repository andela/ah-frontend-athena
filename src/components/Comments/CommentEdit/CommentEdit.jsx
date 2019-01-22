import React from "react";
import PropTypes from "prop-types";
import { MDBIcon } from "mdbreact";

const CommentEdit = ({ clickReply, clickDelete, clickEdit, id }) => {
  return (
    <div>
      <span
        onClick={() => {
          clickReply(id);
        }}
        className="text-primary"
      >
        <MDBIcon icon="reply" />
        reply&nbsp;&nbsp;
      </span>
      <span
        onClick={() => {
          clickEdit(id);
        }}
        className="text-primary"
      >
        <MDBIcon icon="edit" />
        Edit&nbsp;&nbsp;
      </span>
      <span
        onClick={() => {
          clickDelete(id);
        }}
        className="text-primary"
      >
        <MDBIcon icon="trash" />
        delete&nbsp;&nbsp;
      </span>
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
