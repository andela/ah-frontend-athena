import React from 'react'
import { MDBInput, MDBBtn, MDBContainer, MDBCol, MDBRow } from "mdbreact";

const SigupView = () => {
  return (
   <MDBContainer className="w-75 mt-5 pt-5">
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">REGISTER</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Confirm your email"
                icon="exclamation-triangle"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
              />
            </div>
            <div className="text-center">
              <MDBBtn className="form-control" fontWeight="600">Signup</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SigupView;
