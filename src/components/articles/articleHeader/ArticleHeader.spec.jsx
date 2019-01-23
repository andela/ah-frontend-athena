import React from "react";
import { shallow } from "enzyme";
import ArticleHeader from "./ArticleHeader";
import ArticleOptions from "../articleOptions/ArticleOptions";

describe("<ArticleHeader />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ArticleHeader />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render an <ArticleOptions> element", () => {
    expect(wrapper.find(ArticleOptions)).toHaveLength(1);
  });
});
