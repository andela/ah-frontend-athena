import React from "react";
import { shallow } from "enzyme";
import { Editor } from "./Editor";

describe("<Editor />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Editor />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
