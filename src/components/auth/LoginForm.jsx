import React from "react";
import { MDBInput, MDBBtn, MDBContainer, MDBCol, MDBRow } from "mdbreact";
const LoginView = () => {
  return (
    <MDBContainer className="w-75 mt-5 pt-5">
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">LOGIN</p>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn className="form-control" fontWeight="600">Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginView;