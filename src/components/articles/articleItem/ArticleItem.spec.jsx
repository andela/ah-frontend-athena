import React from "react";
import { shallow } from "enzyme";
import ArticleItem from "./ArticleItem";

describe("<ArticleItem />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ArticleItem />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
