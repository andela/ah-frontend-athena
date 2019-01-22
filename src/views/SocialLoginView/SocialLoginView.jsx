import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import SocialLoginButtons from "../../components/SocialLogin/SocialLogin";
import googleLoginActionFunction from "../../actions/googleLoginAction";
import facebookLoginActionFunction from "../../actions/facebookLoginAction";

export class SocialLoginView extends Component {
  /**
   *
   * @param {} props - props passed into the JSX initialisation of the component
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  /**
   * Receives props after action is dispatched.
   * @param {} nextProps - properties object that is updated when an
   * action is dispatched and mapStateToProps below is invoked.
   */
  componentWillReceiveProps(nextProps) {
    let googleResponse = nextProps.returnedDataGoogle;
    if (googleResponse) {
      let googleError = googleResponse.errors;
      let googleUser = googleResponse.user;

      if (googleError) {
        toast.error(googleError.auth_token[0]);
      } else if (googleUser) {
        let jwt_token = googleUser.jwt_token;
        if (jwt_token) {
          toast.success("Successfully logged in with Google.");
          const { history } = this.props;
          window.localStorage.setItem("token", jwt_token);
          history.push("/");
        }
      } else {
        toast.error("Error in Google Auth system. Please try again.");
      }
    }

    let facebookResponse = nextProps.returnedDataFacebook;
    if (facebookResponse) {
      let facebookErrors = facebookResponse.errors;
      let facebookUser = facebookResponse.user;
      if (facebookErrors) {
        toast.error(facebookErrors.auth_token[0]);
      } else if (facebookUser) {
        let jwt_token = facebookUser.jwt_token;
        if (jwt_token) {
          toast.success("Successfully logged in with Facebook.");
          const { history } = this.props;
          window.localStorage.setItem("token", jwt_token);
          history.push("/");
        }
      } else {
        toast.error("Error in Facebook Auth system. Please try again.");
      }
    }
  }

  /**
   * This function is triggered when the user clicks on the signin with Google button.
   * @param {} response - response object from google signin (user data & tokenId)
   */
  handleGoogleLogin = response => {
    if (response.tokenId) {
      const { googleLoginActionFunction } = this.props;
      googleLoginActionFunction(response.tokenId);
    }
  };

  /**
   * This function is triggered when the user clicks on the signin with Facebook button.
   * @param {} response - response object from facebook signin (user data & accessToken)
   */
  handleFacebookLogin = response => {
    if (response.accessToken) {
      const { facebookLoginActionFunction } = this.props;
      facebookLoginActionFunction(response.accessToken);
    }
  };

  render() {
    return (
      <SocialLoginButtons
        facebookLoginHandler={this.handleFacebookLogin}
        googleLoginHandler={this.handleGoogleLogin}
      />
    );
  }
}

SocialLoginView.propTypes = {
  history: PropTypes.shape({}),
  facebookLoginActionFunction: PropTypes.func.isRequired,
  googleLoginActionFunction: PropTypes.func.isRequired,
  returnedDataGoogle: PropTypes.shape({}),
  returnedDataFacebook: PropTypes.shape({})
};
SocialLoginView.defaultProps = {
  history: {},
  returnedDataGoogle: undefined,
  returnedDataFacebook: undefined
};

/**
 * Filters which state values are mapped to current component's props.
 * @param {} state - state object passed down from the root reducer
 */
export const mapStateToProps = state => ({
  returnedDataGoogle: state.googleLogin.responseData,
  returnedDataFacebook: state.facebookLogin.responseData
});

export default withRouter(
  connect(
    mapStateToProps,
    { googleLoginActionFunction, facebookLoginActionFunction }
  )(SocialLoginView)
);
