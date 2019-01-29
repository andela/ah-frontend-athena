import React from 'react';
import {mount} from 'enzyme';
import { mapStateToProps, Followers, imageShow } from './followersView';
import avatar from '../../../components/profile/img/default.png';

const props = {
  bio: '',
  image: '',
  username: ''
}

const initialState = {
  follow: {
    followers: [
      {
        username: 'ntale',
        email: '',
        bio: ''
      }
    ]
  }
}

describe('test followers view', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(<Followers {...props} />)
  })
  it('matches snapshot',()=>{
    expect(wrapper).toMatchSnapshot()
  })
  it('renders followers page', ()=>{
    expect(wrapper.exists()).toEqual(true)
  })
  it('it receives props',()=>{
    wrapper.setProps({followers: []})
    expect(wrapper.state('followers')).toEqual([])
  })
  it('should map state to props', ()=>{
    expect(mapStateToProps(initialState).followers[0].username).toEqual('ntale')
  })
  it('shows followers image', ()=>{
    expect(imageShow('')).toEqual(avatar)
    expect(imageShow('image_url')).toEqual('image_url')
  })
})