import React from "react";
import { shallow } from "enzyme";
import TagInput from "./TagInput";

let tags = ["magic", "angular", "andela"];
const props = {
  tags
};

describe("<TagInput />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TagInput {...props} {...tags} />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleChange ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleChange({
        target: { name: "title", value: "anything" },
        preventDefault: jest.fn
      })
    );
  });
});
