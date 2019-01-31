import React from "react";
import {
  MDBContainer,
  MDBModal,
  MDBIcon,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";
import PropTypes from "prop-types";
import ReportView from "../../views/ReportArticles/ReportView";

export const ReportArticle = ({ modal, close, article }) => {
  return (
    <MDBContainer>
      <MDBModal isOpen={modal} className="">
        <MDBIcon
          icon="times"
          onClick={close}
          style={{ right: 5, position: "absolute" }}
          className=""
        />
        <MDBModalHeader>
          Please tell us why you are reporting this article
        </MDBModalHeader>

        <MDBModalBody>
          <ReportView article={article} />
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

ReportArticle.propTypes = {
  modal: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  article: PropTypes.shape({})
};

ReportArticle.defaultProps = {
  article: {}
};

export default ReportArticle;
