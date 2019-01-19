import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe("Testing not found",()=>{
    let wrapper;
    it("Test if component mounts",()=>{
        wrapper = shallow(<NotFound />)
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.contains(<img alt="" />))
    })
})
