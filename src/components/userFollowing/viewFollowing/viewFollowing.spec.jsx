import React from 'react';
import { shallow } from 'enzyme';
import Following from './viewFollowing';

const props = {
   image: '',
   bio: '',
   username: ''
 }

 describe('test viewing followers', ()=>{
   let wrapper;
   beforeEach(()=>{
     wrapper = shallow(<Following {...props} />)
   })
   it('should render view following page', ()=>{
     expect(wrapper).toMatchSnapshot()
   })
 })
