import React from 'react';
import { shallow } from 'enzyme';
import {EmailPage} from './EmailPage';

describe('test email sent page', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EmailPage />)
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('test whether the wrapper is defined', () => {
    expect(wrapper).toBeDefined()
  })
  it('should find the h2 tag', () => {
    expect(wrapper.find('h2').text()).toBe('An email has been sent')
  });
});