import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import PasswordResetConfirmView from '../../components/PasswordReset/PasswordResetConfirm';
import { PasswordResetConfirmAction } from '../../actions/PasswordResetAction/PasswordResetAction';

export class PasswordResetConfirm extends Component {

  constructor(){
    super();
    this.state = {
      password: '',
      confirmPassword: '',
      errors: '',
    }
  }

  componentWillReceiveProps(nextProps){
    if(Object.keys(nextProps.message).length !== 0){
      const {message}=nextProps
      toast.success(message.detail.toString());
      window.location.href='/login';
    }else if(Object.keys(nextProps.errors).length !== 0){
        this.setState({errors:nextProps.errors})
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {password, confirmPassword}=this.state
    const {PasswordResetConfirmAction}=this.props
    const data = {
      password: password,
      confirm_password: confirmPassword
    }
    const pathName = window.location.pathname.split('/')
    PasswordResetConfirmAction(data, pathName)
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  render() {
    const {errors, password, confirmPassword}=this.state
    return (
      <PasswordResetConfirmView 
        errors={errors}
        onSubmit={this.handleSubmit}
        onChange={this.handleChange} 
        newPassword={password}
        confirmPassword={confirmPassword}
      />
    )
  }
}

PasswordResetConfirm.propTypes = {
  message: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  PasswordResetConfirmAction: PropTypes.func.isRequired
}

PasswordResetConfirm.defaultProps = {
  message: {},
  errors: {},
}

export const mapStateToProps = (state) => {
  
  return{
    errors: state.passwordResetConfirm.errors,
    message: state.passwordResetConfirm.message
  }
}

export default connect(mapStateToProps, {
  PasswordResetConfirmAction
})(PasswordResetConfirm);
