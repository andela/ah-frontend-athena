import React from "react";
import { MDBCard, MDBCardBody, MDBCol } from "mdbreact";
import PropTypes from "prop-types";

export const SearchForm = () => {
  return (
    <div className="mw-100">
      <MDBCol md="4" className="mw-100 mt-3 ">
        <MDBCard className="mw-100 p-2 m-0 ">
          <MDBCardBody className="font-italic p-0 m-0 ">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend pb-2">
                  <span className="input-group-text">Tag</span>
                </div>
                <input type="text" className="form-control" />
              </div>
              <div className="input-group">
                <div className="input-group-prepend pb-2">
                  <span className="input-group-text">Author</span>
                </div>
                <input type="text" className="form-control" />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Title</span>
                </div>
                <input type="text" className="form-control" />
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

export default SearchForm;
