import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginView from "../../components/Login/LoginForm";
import { login } from "../../actions/LoginAction";

/**
 * Class component that renders the
 * different components involved in the Login process
 */
export class Login extends Component {
  /**
   *
   * @param {} props - initial props of Login class
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }
  /**
   * Receives props after action is dispatched.
   * @param {} nextProps - properties object that is updated when an
   * action is dispatched and mapStateToProps below is invoked.
   */
  componentWillReceiveProps(nextProps) {
    const { errors } = nextProps.returnData;
    const { user } = nextProps.returnData;
    if (errors) {
      this.setState({ errors: errors });
    } else if (user) {
      // const {user} = nextProps.returnData;
      const { history } = this.props;
      window.localStorage.setItem("token", user.token);
      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("username", user.username);
      history.push("/");
      window.location.reload();
    }
  }

  /**
   * Takes in changes from input field and updates state appropiately.
   * @param {} event - events from input fields
   */
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This function is triggered when submitting login form.
   * @param {} event - event from input fields
   */
  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { login } = this.props;
    event.preventDefault();
    const loginData = {
      email: email,
      password: password
    };
    login(loginData);
  };

  render() {
    const { errors } = this.state;
    return (
      <LoginView
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
      />
    );
  }
}
Login.propTypes = {
  returnData: PropTypes.shape({}),
  history: PropTypes.shape({}),
  login: PropTypes.func
};
Login.defaultProps = {
  returnData: {},
  login: () => {},
  history: {}
};
/**
 * Filters which state is rendered as props.
 * @param {} state - state object passed down from the root reducer
 */
export const mapStateToProps = state => ({
  returnData: state.login.login
});
export default connect(
  mapStateToProps,
  { login }
)(Login);
