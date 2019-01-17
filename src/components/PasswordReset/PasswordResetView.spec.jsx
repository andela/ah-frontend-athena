import React from 'react';
import { shallow } from 'enzyme';
import PasswordResetView  from './PasswordReset';
import PasswordResetConfirmView from './PasswordResetConfirm';

let props = {
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  value: {},
  errors:{email: ''}
}
let wrapper;

describe('test password email view', () => {
  beforeEach(() => {
    wrapper = shallow(<PasswordResetView {...props} />)
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('should render a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  })
})

describe('test password confirm resetting', () => {
  beforeEach(() => {
    wrapper = shallow(<PasswordResetConfirmView {...props} />)
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('should render a form', () => {
    expect(wrapper.find('form')).toHaveLength(1);
  })
})

