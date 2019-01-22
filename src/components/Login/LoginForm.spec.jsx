import React from "react";
import { shallow } from "enzyme";
import LoginForm from "./LoginForm";

let props = {
  errors: "",
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  googleLoginHandler: jest.fn(),
  facebookLoginHandler: jest.fn()
};
describe("Testing login form", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginForm {...props} />);
  });
  it("Login form should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
