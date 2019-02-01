import React from "react";
import { shallow } from "enzyme";
import ReadingStats from "./ReadingStats";

let props = {
  article: {
    title: "",
    read_count: "",
    view_count: ""
  }
};

describe("Test if ReadingStats component mounts", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ReadingStats {...props} />);
  });
  it("Reading stats should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
