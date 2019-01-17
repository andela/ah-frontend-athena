import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../../components/Login/LoginForm';
import login from '../../actions/LoginAction';
 
/**
 * A class that holds all the logic for login
 */
export class Login extends Component{
  /**
   * 
   * @param {} props - initial props of login class
   */
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      errors: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /**
   * Receives props after action is dispatched.
   * @param {} nextProps - Props received by login class
   * once a login action is dispatched.
   */
componentWillReceiveProps(nextProps){
  const {errors} = nextProps.returnData;
  if(errors){
    this.setState({errors:errors});
  }
  else{
    const {user} = nextProps.returnData;
    const {history} = this.props;
    window.localStorage.setItem('token', user.token)
    history.push('/articles')
  }
}
/**
 * Takes in changes from input field and updates state appropiately.
 * @param {} event - events from input fields
 */
handleChange(event){
  this.setState({[event.target.name]: event.target.value});
  
}
/**
 * This function is triggered when submitting login form.
 * @param {} event - event from input fields
 */
handleSubmit(event){
  const {email, password} = this.state;
  const {login} = this.props
  event.preventDefault();
  const loginData = {
      email: email,
      password: password
  }
  login(loginData);
}
  render(){
    const {errors} = this.state;
    return(
      <LoginView 
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        errors={errors}
      />
    )
  }
}
Login.propTypes = {
  returnData: PropTypes.shape({}),
  history: PropTypes.shape({}),
  login: PropTypes.func
};
Login.defaultProps = {
  returnData: {},
  login:()=>{},
  history: {}
}
/**
 * Filters which state is rendered as props.
 * @param {} state - state of components
 */
export const mapStateToProps = state => ({
  returnData: state.login.login
});
export default connect(mapStateToProps, {login})(Login);
