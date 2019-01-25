import React from "react";
import { shallow } from "enzyme";
import LoginModal from "./LoginModal";

let props = {
  modal: "",
  toggle: jest.fn(),
  fallback: "",
  history: jest.fn(),
  md: ""
};
describe("Test if the modal form renders", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginModal {...props} />);
  });
  it("Check if the modal renders", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
