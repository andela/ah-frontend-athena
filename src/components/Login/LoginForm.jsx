import React from "react";
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody
} from "mdbreact";
import classnames from "classnames";
import PropTypes from "prop-types";
import "./LoginForm.scss";
import SocialLoginButtons from "../../views/SocialLoginView/SocialLoginView";

const LoginView = ({ onChange, onSubmit, errors }) => {
  return (
    <MDBContainer className="mt-3 pt-6 w-sm-100 w-md-75 mt-5 mb-5">
      <MDBRow className="flex flex-center">
        <MDBCol md="6">
          <form onSubmit={onSubmit}>
            <MDBCard>
              <div className="header pt-3 bg-primary">
                <MDBRow className="d-flex justify-content-center">
                  <h3 className="font-weight-bold white-text mt-3 mb-4 pb-1 mx-5">
                    Login
                  </h3>
                </MDBRow>
              </div>
              <MDBCardBody className="mx-4 mt-4 grey-text">
                <p className=" red-text is-valid">{errors.error}</p>
                <MDBInput
                  name="email"
                  label="Type your email"
                  group
                  icon="envelope"
                  className={classnames("form-control form-control-lg", {
                    "is-valid": errors.email
                  })}
                  containerClass="mb-0"
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  onChange={onChange}
                  id="email"
                />
                <p className=" red-text is-valid">{errors.email}</p>
                <MDBInput
                  name="password"
                  label="Type your password"
                  group
                  icon="lock"
                  className={classnames("form-control form-control-lg", {
                    "is-valid": errors.password
                  })}
                  type="password"
                  validate
                  containerClass="mb-0"
                  onChange={onChange}
                />
                <p className=" red-text is-valid">{errors.password}</p>

                <div className="text-center">
                  <MDBBtn
                    type="submit"
                    className="btn-block z-depth-2 bg-primary"
                    color="bg-primary"
                  >
                    Login
                  </MDBBtn>
                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                    <a href="/passwordreset" className="blue-text ml-1">
                      Forgot Password?
                    </a>
                  </p>

                  <div className="row my-3 d-flex justify-content-center">
                    <SocialLoginButtons />
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
LoginView.propTypes = {
  errors: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default LoginView;
