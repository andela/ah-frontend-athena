import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import SignupForm from '../../components/Signup/SignupForm'
import { signUp } from '../../actions/signupAction/signupAction'

export class SignupView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        };

    }
    componentWillReceiveProps(nextProps){
        const errors = nextProps.data
        if(errors){
            this.setState({errors:errors});
        }

    }
    onChange = (e)=>{

        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit = (e)=> {
        e.preventDefault();
        const userobj = this.state
        const user = {
            username: userobj.username,
            email: userobj.email,
            password: userobj.password
        }
        const { signUp } = this.props;
        signUp(user)
    }
    render() {
        const {errors} = this.state
        return (
          <div>
            <SignupForm
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              onClick={this.onClick}
              errors={errors}
            />
          </div>

        );
    }
}

SignupView.propTypes = {
    data: PropTypes.shape({}),
    signUp: PropTypes.func

};

SignupView.defaultProps = {
    data: {},
    signUp: () => {}
  }
export const mapStateToProps = (state)=>{
    return {
        data: state.user.user
    }
}

export default connect(
    mapStateToProps,
    {signUp}
) (SignupView);