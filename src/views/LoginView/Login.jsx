import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MDBCol, MDBRow } from "mdbreact";
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
    const { fallback } = this.props;
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
      fallback ? history.push(fallback) : history.push("/");
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
    const { md } = this.props;
    return (
      <div className="mt-3 pt-6 w-sm-100 w-md-25 ">
        <MDBRow className="flex flex-center m-0">
          <MDBCol md={md} className="m-0 p-0">
            <LoginView
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              errors={errors}
            />
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}
Login.propTypes = {
  returnData: PropTypes.shape({}),
  history: PropTypes.shape({}),
  login: PropTypes.func,
  md: PropTypes.string,
  fallback: PropTypes.string
};
Login.defaultProps = {
  returnData: {},
  login: () => {},
  history: {},
  md: "",
  fallback: ""
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
