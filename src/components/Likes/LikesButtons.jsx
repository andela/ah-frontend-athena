import React from "react";
import { MDBContainer, MDBRow, MDBIcon, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import "./LikeButtons.scss";

const LikesButtons = ({ like, onClick, onClick2, likes_count }) => {
  const icons = like();
  return (
    <div>
      <MDBContainer>
        <MDBRow className="flex">
          <MDBCol md="3" className="offset-md-3">
            <span className={icons.icon1}>{likes_count}</span>
            <MDBIcon
              id="likeBtn"
              icon="thumbs-up"
              size="2x"
              onClick={onClick}
              className={icons.icon1}
            />
            <MDBIcon
              id="unlikeBtn"
              icon="thumbs-down"
              size="2x"
              onClick={onClick2}
              className={icons.icon2}
              flip="horizontal"
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};
LikesButtons.propTypes = {
  like: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClick2: PropTypes.func.isRequired,
  likes_count: PropTypes.string.isRequired
};
export default LikesButtons;
