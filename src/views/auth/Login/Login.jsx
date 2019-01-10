import React, {Component} from 'react';
import LoginView from '../../../components/auth/LoginForm'

class Login extends Component{

  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  render(){
    return(
      <LoginView />
    )
  }
}

export default Login;