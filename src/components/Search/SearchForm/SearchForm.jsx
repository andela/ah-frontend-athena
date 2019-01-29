import React from "react";
import { MDBCard, MDBCardBody, MDBCol } from "mdbreact";
import PropTypes from "prop-types";

export const SearchForm = ({ handleChange, handleSubmit }) => {
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
                <input
                  name="tag"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend pb-2">
                  <span className="input-group-text">Author</span>
                </div>
                <input
                  name="author"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Keyword</span>
                </div>
                <input
                  name="keyword"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <hr />
              <button
                disabled={false}
                onClick={handleSubmit}
                type="button"
                className="btn btn-search btn-light btn-sm m-1"
              >
                search...
              </button>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};

SearchForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
};

SearchForm.defaultProps = {
  handleChange: () => {},
  handleSubmit: () => {}
};

export default SearchForm;
