import React from "react";
import PropTypes from "prop-types";
import { MDBInput, MDBContainer, MDBCardBody, MDBCard, MDBBtn } from "mdbreact";

const CommentCard = ({ onChange, onSubmitReply }) => {
  return (
    <div className="">
      <MDBContainer className="my-3 mx-0 px-0">
        <MDBCard className="w-75">
          <MDBCardBody>
            <form onSubmit={onSubmitReply}>
              <MDBInput
                onChange={onChange}
                label="add comment"
                name="comment_body"
                type="textarea"
                id="reply"
                cols="30"
                rows="2"
                required
              />
              <p />
              <MDBBtn
                className="m-1 p-1 left ml-4"
                color="primary"
                type="submit"
              >
                comment
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

CommentCard.propTypes = {
  onChange: PropTypes.func,
  onSubmitReply: PropTypes.func
};
CommentCard.defaultProps = {
  onChange: () => {},
  onSubmitReply: () => {}
};
export default CommentCard;
