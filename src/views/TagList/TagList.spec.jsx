import React from "react";
import { shallow, mount } from "enzyme";
import { TagList } from "./TagList";

const handleClick = jest.fn;
const getArticles = jest.fn;
let tags = ["magic", "angular", "andela"];
const props = {
  handleClick,
  getArticles,
  tags
};

describe("<TagList />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TagList {...props} />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handHover ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleClick({
        preventDefault: jest.fn,
        getArticles: jest.fn,
        target: { value: "react" }
      })
    );
  });

  it("render empty div", () => {
    const mWrapper = mount(<TagList {...props} />);
    mWrapper.setProps(tags);
    expect(mWrapper.find("button").length).toEqual(3);
  });

  it("render empty div", () => {
    const mWrapper = mount(<TagList />);
    expect(mWrapper.find("button").length).toEqual(0);
  });
});
