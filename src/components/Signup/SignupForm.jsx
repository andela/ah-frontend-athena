import React from "react";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBModalFooter
} from "mdbreact";
import classnames from "classnames";
import SocialLoginButtons from "../../views/SocialLoginView/SocialLoginView";
import "./SignupForm.scss";

const SignupForm = ({ onChange, onSubmit, errors }) => {
  return (
    <MDBContainer className="mt-3 pt-6 w-sm-100 w-md-75 mt-5 mb-5">
      <MDBRow className="flex flex-center">
        <MDBCol lg="7">
          <form onSubmit={onSubmit}>
            <MDBCard>
              <div className="header pt-3 bg-primary">
                <MDBRow className="d-flex justify-content-center">
                  <h3 className="font-weight-bold white-text mt-3 mb-4 pb-1 mx-5">
                    Sign Up
                  </h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4 grey-text">
                <MDBInput
                  label="Your Username"
                  onChange={onChange}
                  group
                  className={classnames("form-control mb-0 form-control-lg ", {
                    "is-valid": errors.username
                  })}
                  containerClass="mb-0"
                  type="text"
                  icon="user"
                  required
                  name="username"
                  validate
                />

                <p className=" red-text is-invalid p-0">{errors.username}</p>
                <MDBInput
                  label="Your email"
                  name="email"
                  onChange={onChange}
                  containerClass="mb-0"
                  icon="envelope"
                  group
                  className={classnames("form-control mb-0 form-control-lg ", {
                    "is-valid": errors.email
                  })}
                  type="email"
                  validate
                />
                <p className=" red-text is-invalid">{errors.email}</p>
                <MDBInput
                  label="Your password"
                  group
                  name="password"
                  onChange={onChange}
                  type="password"
                  icon="lock"
                  containerClass="mb-0"
                  required
                  className={classnames("form-control mb-0 form-control-lg", {
                    "is-valid": errors.password
                  })}
                />
                <p className=" red-text is-invalid">{errors.password}</p>
                <div className="text-center mb-4 mt-5">
                  <MDBBtn
                    color="bg-primary"
                    type="submit"
                    value="submit"
                    className="btn-block z-depth-2 bg-primary"
                  >
                    Sign up
                  </MDBBtn>
                </div>
                <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                  or Sign in with:
                </p>
                <div className="row my-3 d-flex justify-content-center">
                  <SocialLoginButtons />
                </div>
                <MDBModalFooter className="mx-5 pt-3 mb-1" />
                <p className="font-small grey-text d-flex justify-content-center">
                  Have an account?
                  <a href="/login" className="blue-text ml-1">
                    Log in
                  </a>
                </p>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

SignupForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])
};

SignupForm.defaultProps = {
  errors: {}
};

export default SignupForm;
