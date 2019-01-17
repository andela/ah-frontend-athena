import React from 'react';
import PropTypes from 'prop-types';
import { MDBInput, MDBBtn, MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody } from "mdbreact";

const PasswordResetView = (props) => {
  const {onSubmit,onChange,email,errors}=props
  return (
    <MDBContainer className="w-75 mt-5 pt-5 mt-5 mb-5">
      <MDBRow className="flex flex-center">
        <MDBCol md="6">
          <MDBCard>
            <div className="header pt-3 blue lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h4 className="text-white mt-3 mb-4 pb-1 mx-5">
                  Forgot Password?
                </h4>
              </MDBRow>
            </div>
            <MDBCardBody>
              <form onSubmit={onSubmit}>
                <div className="grey-text">
                  <MDBInput
                    name="email"
                    label="Type your email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={onChange}
                    value={email}
                    required
                  />
                  <span className=" red-text is-invalid">{errors.email}</span>
                  <MDBBtn className="form-control" color="info" fontWeight="600" type='submit'>Submit</MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

PasswordResetView.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.shape({}),
  errors: PropTypes.shape({})
}

PasswordResetView.defaultProps = {
  email: {},
  errors: {}
}

export default PasswordResetView;
