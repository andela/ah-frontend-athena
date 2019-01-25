import React from 'react';
import { shallow } from 'enzyme';
import Following from './userFollowing'

const props = {
  handleClick: jest.fn(),
  text: '',
  classValue: '',
  canFollow: false
}

describe('test follow button', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Following {...props} />)
  })
  it('should render follow button', ()=>{
    expect(wrapper).toMatchSnapshot()
  })
})