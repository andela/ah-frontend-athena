import React from "react";
import { shallow } from "enzyme";
import RoundButton from "./RoundButton";

let props = {
  onClick: jest.fn()
};

describe("test round button", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RoundButton {...props} />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
