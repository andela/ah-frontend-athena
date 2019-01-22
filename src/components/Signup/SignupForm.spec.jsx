import { shallow } from "enzyme";
import React from "react";
import SignupForm from "./SignupForm";

let props = {
  errors: {},
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  googleLoginHandler: jest.fn(),
  facebookLoginHandler: jest.fn()
};
describe("Signform test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SignupForm {...props} />);
  });

  it("matches snapshot", () => {
    const component = shallow(<SignupForm {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("should render a form", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });
  it("should simulate onsubmit event", () => {
    wrapper.find("form").simulate("submit", {
      target: { name: "email", value: "kasulee@andela.com" }
    });
    expect(props.onSubmit).toBeCalled();
  });
});
