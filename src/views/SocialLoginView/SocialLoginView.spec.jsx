import React from "react";
import { shallow } from "enzyme";
import { SocialLoginView, mapStateToProps } from "./SocialLoginView";

let push = jest.fn();
const googleLoginActionFunction = jest.fn();
const facebookLoginActionFunction = jest.fn();

let props = {
  googleLoginActionFunction,
  facebookLoginActionFunction,
  googleLogin: {
    responseData: {
      user: { jwt_token: "mocked token" },
      errors: { auth_token: ["faked facebook login error"] }
    }
  },
  facebookLogin: {
    responseData: {
      user: { jwt_token: "mocked token" },
      errors: { auth_token: ["faked facebook login error"] }
    }
  },
  history: { push }
};

const initialState = {
  googleLogin: {
    responseData: {
      user: { jwt_token: "mocked token" },
      errors: { auth_token: ["faked facebook login error"] }
    }
  },
  facebookLogin: {
    responseData: {
      user: { jwt_token: "mocked token" },
      errors: { auth_token: ["faked facebook login error"] }
    }
  }
};
let wrapper;

describe("Test SocialLoginView stateful component", () => {
  beforeEach(() => {
    wrapper = shallow(<SocialLoginView {...props} />);
  });

  it("should match the SocialLoginView snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should receive and handle nextProps properly", () => {
    wrapper.setProps({
      returnedDataFacebook: { user: { jwt_token: "mocked token" } }
    });
    expect(wrapper.instance().props.returnedDataFacebook).toEqual({
      user: { jwt_token: "mocked token" }
    });
  });

  it("should receive and handle facebook error data properly", () => {
    wrapper.setProps({
      returnedDataFacebook: {
        errors: { auth_token: ["faked facebook login error"] }
      }
    });
    expect(wrapper.instance().props.returnedDataFacebook).toEqual({
      errors: { auth_token: ["faked facebook login error"] }
    });
  });

  it("should handle facebook fatal error data properly", () => {
    wrapper.setProps({
      returnedDataFacebook: undefined
    });
    expect(wrapper.instance().props.returnedDataFacebook).toEqual(undefined);
  });

  it("should receive and handle google success properly", () => {
    wrapper.setProps({
      returnedDataGoogle: { user: { jwt_token: "mocked token" } }
    });
    expect(wrapper.instance().props.returnedDataGoogle).toEqual({
      user: { jwt_token: "mocked token" }
    });
  });

  it("should receive and handle google error data properly", () => {
    wrapper.setProps({
      returnedDataGoogle: {
        errors: { auth_token: ["faked google login error"] }
      }
    });
    expect(wrapper.instance().props.returnedDataGoogle).toEqual({
      errors: { auth_token: ["faked google login error"] }
    });
  });

  it("should handle facebook fatal error data properly", () => {
    wrapper.setProps({
      returnedDataFacebook: undefined
    });
    expect(wrapper.instance().props.returnedDataFacebook).toEqual(undefined);
  });

  it("should map state to props", () => {
    expect(mapStateToProps(initialState).returnedDataFacebook["user"]).toEqual({
      jwt_token: "mocked token"
    });
  });

  it("should invoke handleGoogleLogin function and call action", () => {
    wrapper.instance().handleGoogleLogin({
      tokenId: "mocked token id from google"
    });
    expect(googleLoginActionFunction).toBeCalled();
  });

  it("should invoke handleFacebookLogin function and call action", () => {
    wrapper.instance().handleFacebookLogin({
      accessToken: "mocked token id from facebook"
    });
    expect(googleLoginActionFunction).toBeCalled();
  });
});
