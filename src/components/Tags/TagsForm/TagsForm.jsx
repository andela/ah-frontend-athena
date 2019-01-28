import React from "react";
import { MDBCard, MDBCardBody, MDBCol } from "mdbreact";
import PropTypes from "prop-types";
import TagList from "../../../views/TagList/TagList";

export const TagsForm = ({ tags }) => {
  const tagList = [];
  tags.forEach(tag => {
    tagList.push(tag.tag);
  });
  return (
    <div className="mw-100">
      <MDBCol md="4" className="mw-100 mt-3 ">
        <MDBCard className="mw-100 p-2 m-0 ">
          <MDBCardBody className="font-italic p-0 m-0 ">
            <TagList tags={tagList} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

export default TagsForm;

TagsForm.propTypes = {
  tags: PropTypes.shape([])
};

TagsForm.defaultProps = {
  tags: []
};
