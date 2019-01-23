import React from "react";
import { shallow } from "enzyme";
import ArticleOptions from "./ArticleOptions";
import RoundButton from "../../RoundButton/RoundButton";

describe("<ArticleOptions />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ArticleOptions />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should an <RoundButton> element", () => {
    expect(wrapper.find(RoundButton)).toHaveLength(2);
  });
});
