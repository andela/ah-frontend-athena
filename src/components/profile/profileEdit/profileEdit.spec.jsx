import React from 'react';
import { shallow } from 'enzyme';
import ProfileEdit from './profileEdit';

let props = {
  data: {
    username: '',
    email: '',
    image: '',
    bio: ''
  }
}

describe('test edit page', ()=>{
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProfileEdit {...props} />)
  })
  it('should render edit page',()=>{
    expect(wrapper).toMatchSnapshot();
  })
})