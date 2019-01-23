import React from "react";
import { shallow } from "enzyme";
import { ArticleView } from "./ArticleView";

let push = jest.fn();
let returnData = {};
let deleteArticle = jest.fn();
let props = {
  history: { push },
  returnData,
  deleteArticle
};

describe("<ArticleView>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ArticleView {...props} />);
  });
  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render an <ArticleView> element", () => {
    expect(wrapper.exists()).toEqual(true);
  });
  it("should call handleDelete ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleDelete({
        preventDefault: jest.fn,
        push: jest.fn
      })
    );
  });

  it("should call handleDelete ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleLink({
        preventDefault: jest.fn,
        push: jest.fn
      })
    );
  });
});
