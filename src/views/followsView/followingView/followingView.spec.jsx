import React from 'react';
import { mount } from 'enzyme'
import {Following, mapStateToProps, imageShow} from './followingView'
import avatar from '../../../components/profile/img/default.png';

const props = {
  Username: '',
  Email: '',
  Bio: ''
}

const initialState = {
  follow: {
    data: [{
      username: 'ntale',
      email: '',
      bio: '',
      image: ''
    }]
  }
}

describe('test following view', ()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper = mount(<Following {...props} />)
  })
  it('renders following page', ()=>{
    expect(wrapper.exists()).toEqual(true)
  })
  it('receives props', ()=>{
    wrapper.setProps({followingData: []})
    expect(wrapper.state('followingData')).toEqual([])
  })
  it('maps state to props', ()=>{
    expect(mapStateToProps(initialState).following[0].username).toEqual('ntale')
  })
  it('test image display', ()=>{
    expect(imageShow('')).toEqual(avatar)
    expect(imageShow('image_url')).toEqual('image_url')
  })
})