import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import PasswordResetView from '../../components/PasswordReset/PasswordReset';
import { PasswordResetAction } from '../../actions/PasswordResetAction/PasswordResetAction';

export class PasswordReset extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      errors: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if(Object.keys(nextProps.message).length !== 0){
      window.location.href='/email-has-been-sent'
      
    }else if(Object.keys(nextProps.errors).length !== 0){
        this.setState({errors:nextProps.errors})
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {email}=this.state
    const {PasswordResetAction}=this.props
    const data = {
      email: email
    }
    PasswordResetAction(data)
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };

  render() {
    const {email, errors}=this.state
    return (
      <PasswordResetView
        onSubmit={this.handleSubmit}
        onChange={this.handleChange} 
        email={email}
        errors={errors}
      />
    );
  }
}

PasswordReset.propTypes = {
  message: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  PasswordResetAction: PropTypes.func.isRequired
}

PasswordReset.defaultProps = {
  message: {},
  errors: {}
}

export const mapStateToProps = (state)=>{
  
  return{
    errors: state.passwordResetConfirm.errors,
    message: state.passwordResetConfirm.message
  }
}

export default connect(mapStateToProps, {
  PasswordResetAction
})(PasswordReset);
