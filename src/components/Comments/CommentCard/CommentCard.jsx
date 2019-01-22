import React from "react";
import { MDBInput, MDBContainer, MDBCardBody, MDBCard, MDBBtn } from "mdbreact";

const CommentCard = ({ onChange, onSubmit}) => {
  return (
    <div>
      <MDBContainer className="mt-5 mb-5">
        <MDBCard className="w-50 h-50">
          <MDBCardBody>
            <form onSubmit={onSubmit}>
              <MDBInput
                type="textarea"
                label="comment"
                rows="2"
                column="30"
                icon="pencil-alt"
                id="comment"
                name="comment_body"
                onChange={onChange}
                required
              />
              <p />
              <MDBBtn
                className="left ml-4"
                type="submit"
                size="sm"
                color="primary"
              >
                submit
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};
export default CommentCard;
