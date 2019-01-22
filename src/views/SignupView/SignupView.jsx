import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signUp } from "../../actions/signupAction/signupAction";
import SigupView from "../../components/Signup/SignupForm";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const errors = nextProps.data;
    if (errors) {
      this.setState({ errors: errors });
    }

    if (nextProps.data.toString().includes("verification")) {
      const { history } = this.props;
      history.push("/login");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userobj = this.state;
    const user = {
      username: userobj.username,
      email: userobj.email,
      password: userobj.password
    };
    const { signUp } = this.props;
    signUp(user);
  };

  render() {
    const { errors } = this.state;
    return (
      <SigupView
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onClick={this.onClick}
        errors={errors}
      />
    );
  }
}

Signup.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  signUp: PropTypes.func,
  history: PropTypes.shape({})
};

Signup.defaultProps = {
  data: {},
  signUp: () => {},
  history: {}
};

export const mapStateToProps = state => ({
  data: state.user.user
});

export default connect(
  mapStateToProps,
  { signUp }
)(Signup);
