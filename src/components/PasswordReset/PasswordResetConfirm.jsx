import React from 'react';
import PropTypes from 'prop-types';
import { MDBInput, MDBBtn, MDBContainer, MDBCol, MDBRow, MDBCard, MDBCardBody  } from "mdbreact";
import './PasswordReset.scss';

const PasswordResetConfirmView = (props) => {
  const {onSubmit,onChange,newPassword,confirmPassword,errors}=props
  return (
    <MDBContainer className="w-75 mt-5 pt-5 mt-5 mb-5">
      <MDBRow className="flex flex-center">
        <MDBCol md="6">
          <MDBCard>
            <div className="header pt-3 blue lighten-2">
              <MDBRow className="d-flex justify-content-start">
                <h4 className="text-white mt-3 mb-4 pb-1 mx-5">
                  Reset Password
                </h4>
              </MDBRow>
            </div>
            <MDBCardBody>
              <form onSubmit={onSubmit}>
                <div className="grey-text">
                  <MDBInput
                    name="password"
                    label="New Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    onChange={onChange}
                    value={newPassword}
                    required
                  />
                  <MDBInput
                    name="confirmPassword"
                    label="Confirm Password"
                    icon="lock"
                    group
                    type="password"
                    validate
                    onChange={onChange}
                    value={confirmPassword}
                    required
                  />
                  <span className=" red-text is-invalid">{errors.body}</span>
                  <span className=" red-text is-invalid">{errors.password}</span>
                </div>
                <div className="text-center">
                  <MDBBtn className="form-control" color="info" fontWeight="600" type="submit">Submit</MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

PasswordResetConfirmView.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  newPassword: PropTypes.shape({}),
  confirmPassword: PropTypes.shape({})
}

PasswordResetConfirmView.defaultProps = {
  newPassword: {},
  confirmPassword: {},
  errors: {}
}

export default PasswordResetConfirmView;
