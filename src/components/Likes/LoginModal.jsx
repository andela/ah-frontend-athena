import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import PropTypes from "prop-types";
import Login from "../../views/LoginView/Login";

const ModalPage = ({ modal, toggle, fallback, history, md }) => {
  return (
    <MDBContainer>
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>
          Please login before you can like or dislike the article
        </MDBModalHeader>
        <MDBModalBody>
          <Login fallback={fallback} history={history} md={md} />
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};
ModalPage.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  fallback: PropTypes.string.isRequired,
  history: PropTypes.func.isRequired,
  md: PropTypes.string.isRequired
};
export default ModalPage;
