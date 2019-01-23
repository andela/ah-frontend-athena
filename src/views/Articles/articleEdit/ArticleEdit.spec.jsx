import React from "react";
import { shallow } from "enzyme";
import { ArticleEdit } from "./ArticleEdit";
import Editor from "../../../components/articles/editor/Editor";

let push = jest.fn();
let split = jest.fn();
let returnData = {};

let articleDta = {
  article: {
    title: "title",
    description: "description",
    body: "this is body",
    author: {
      username: "henry"
    }
  }
};
let props = {
  history: { push },
  returnData,
  split
};

let tagList = ["one two three four"];

describe("<ArticleEdit />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ArticleEdit {...props} {...tagList} />);
  });

  it("matches snapshort", () => {
    const shallowrapper = shallow(<ArticleEdit />);
    expect(shallowrapper).toMatchSnapshot();
  });

  it("should render an <ArticleEdit> element", () => {
    expect(wrapper.exists()).toEqual(true);
  });

  it("should render <Editor /> ", () => {
    expect(wrapper.find(Editor)).toHaveLength(1);
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

  it("should call handleBodyChange ", () => {
    const instance = wrapper.instance();
    expect(instance.handleBodyChange({ body: "anything" }));
  });

  it("should call handleTags ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleTags({
        target: { value: "anything" },
        preventDefault: jest.fn
      })
    );
  });

  it("should call handleSubmit ", () => {
    const instance = wrapper.instance();
    wrapper.setState({ tagList: ["one two three four"] });
    expect(
      instance.handleSubmit({
        target: { name: "draft" },
        published: false,
        preventDefault: jest.fn
      })
    );
  });

  it("should call handleSubmit ", () => {
    wrapper.setState({ tagList: ["one two three four"] });
    const instance = wrapper.instance();
    expect(
      instance.handleSubmit({
        target: { name: "publish" },
        published: true,
        preventDefault: jest.fn
      })
    );
  });

  it("should componet did mout ", () => {
    wrapper.setProps(articleDta);
    expect(wrapper.state()).toEqual({
      author: { username: "henry" },
      body: "this is body",
      description: "description",
      id: 0,
      images: [],
      published: true,
      slug: "",
      tagList: [],
      title: "title"
    });
  });
});
