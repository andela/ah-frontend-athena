import React from 'react';
import { shallow } from 'enzyme';
import ProfileView from './profileView';

let props = {
  profile: {
    username: '',
    email: '',
    bio:'',
    image: ''
  }
}

describe('test profile view page', ()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProfileView {...props} />)
  })
  it('should show profile dropDown', ()=>{
    expect(wrapper).toMatchSnapshot()
  })
})
