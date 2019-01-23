import React from 'react';
import { shallow } from 'enzyme';
import { PasswordReset, mapStateToProps } from './PasswordReset';
import { PasswordResetConfirm } from './PasswordResetConfirm';
import * as obj from './PasswordResetConfirm';

let props2 = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  PasswordResetConfirmAction: jest.fn(),
  newPassword: {},
  confirmPassword: {},
}
let props = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  PasswordResetAction: jest.fn(),
  email: {},
  errors: {}
}

const initialState = {
  passwordResetConfirm:{
  email: '',
  errors: 'wrong email'}
}
const initialState2 = {
  passwordResetConfirm:{
  message: '',
  errors: 'password not equal'}
}

let wrapper;
let otherWrapper;

describe('test password reset component', () => {
  beforeEach(() => {
    wrapper = shallow(<PasswordReset {...props} />)
  });
  it('compare snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should call handle change', () => {
    wrapper.instance().handleChange({target: {name:'email',value:'josh@andela.com'}})
    expect(wrapper.state('email')).toEqual('josh@andela.com')
  })

  it('should handle submit', () => {
    wrapper.instance().handleSubmit({preventDefault() {}})
    expect(wrapper.state('email')).toEqual('')
  })
  it('will recieve next props success', ()=> {
    wrapper.setProps({message:{email: 'josh@gmail.com'}})
    expect(wrapper.state('email')).toEqual('')
   })
   it('will not recieve next props errors', ()=> {
    wrapper.setProps({message:{errors:"error message"}})
    expect(wrapper.state('errors')).toEqual('')
   })
  it('test mapStateToProps', () => {
    expect(mapStateToProps(initialState).errors).toEqual('wrong email')
  })
}); 

describe('test password reset confirm component', () => {
  beforeEach(() => {
    otherWrapper = shallow(<PasswordResetConfirm {...props2} />)
  });
  it('compare snapshot', () => {
    expect(otherWrapper).toMatchSnapshot()
  });
  it('should call handle change', () => {
    otherWrapper.instance().handleChange({target: {name:'password',value:'qwerty123'}})
    expect(otherWrapper.state('password')).toEqual('qwerty123')
  })
  it('should handle submit', () => {
    otherWrapper.instance().handleSubmit({preventDefault() {}})
    expect(otherWrapper.state()).toEqual({"confirmPassword": "", "errors": "", "password": ""})
  })
  it('will receieve next props', ()=> {
    otherWrapper.setProps({message:{detail:'josh@me.com'}})
    expect(otherWrapper.state().password).toEqual('')
   })
  it('test mapStateToProps', () => {
    expect(obj.mapStateToProps(initialState2).errors).toEqual("password not equal")
  })
}); 
