import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

let props = {
  pageNumber: [1,2,3],
  nextPage:3,
  previousPage:1,
  currentPage: 2,
  getMoreArticles: jest.fn(),
  searchParam: 'andela'
}

let props2 = {
  pageNumber: [1],
  nextPage:1,
  previousPage:1,
  currentPage: 1,
  getMoreArticles: jest.fn(),
  searchParam: ''
}
let wrapper;

describe('test pagination', () => {
  beforeEach(() => {
    wrapper = shallow(<Pagination {...props} />)
  })
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('onClick handler', () => {
    wrapper.find('.link').at(0).simulate('click', {target:{id:1}})
  })
  it('return empty div', () => {
    wrapper.setProps({pageNumber: []})
  })
  it('should test same pages', () => {
    wrapper = shallow(<Pagination {...props2} />)
    wrapper.find('.link').at(0).simulate('click', {target:{id:1}})
  })
})

