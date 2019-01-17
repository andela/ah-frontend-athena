import React from "react";
import PropTypes from "prop-types";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { SocialIcon } from "react-social-icons";

export const SocialLogin = ({ facebookLoginHandler, googleLoginHandler }) => (
  <div>
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      autoLoad="false"
      fields="name,email,picture"
      onClick={facebookLoginHandler}
      callback={facebookLoginHandler}
      render={renderProps => (
        <SocialIcon onClick={renderProps.onClick} network="facebook" />
      )}
    />
    {` `}
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      render={renderProps => (
        <SocialIcon onClick={renderProps.onClick} network="google" />
      )}
      onSuccess={googleLoginHandler}
      onFailure={googleLoginHandler}
    />
  </div>
);

SocialLogin.propTypes = {
  facebookLoginHandler: PropTypes.func.isRequired,
  googleLoginHandler: PropTypes.func.isRequired
};

export default SocialLogin;
