import React from "react";
import { shallow } from "enzyme";
import Load from "./Load";

describe("Test like buttons", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Load />);
  });
  it("Test if like and dislike buttons mount", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
