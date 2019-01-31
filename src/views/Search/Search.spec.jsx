import React from "react";
import { shallow } from "enzyme";
import { Search } from "./Search";

describe("<Search>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Search />);
  });
  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleSubmit ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleSubmit({
        preventDefault: jest.fn
      })
    );
  });

  it("should call handleSubmit ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleChange({
        target: { value: "tag" },
        preventDefault: jest.fn
      })
    );
  });
});
