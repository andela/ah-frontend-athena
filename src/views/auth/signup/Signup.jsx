import React, {Component} from 'react';
import SigupView from '../../../components/auth/SignupForm'

class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render(){
    return(
      <SigupView />
    )
  }
}

export default Signup;