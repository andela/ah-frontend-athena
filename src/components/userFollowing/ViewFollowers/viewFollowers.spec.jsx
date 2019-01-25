import React from 'react';
import { shallow } from 'enzyme';
import Followers from './viewFollowers';

const props = {
  image: '',
  username: '',
  bio: '',
}

describe('test viewing followers', ()=> {
  let wrapper;
  beforeEach(()=>{
    wrapper = shallow(<Followers {...props} />)
  })
  it('renders followers page', () =>{
    expect(wrapper).toMatchSnapshot()
  })
})