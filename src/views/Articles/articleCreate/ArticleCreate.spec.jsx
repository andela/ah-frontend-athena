import React from "react";
import { shallow } from "enzyme";
import { ArticleCreate, mapStateToProps } from "./ArticleCreate";
import Editor from "../../../components/articles/editor/Editor";

const initialState = {
  articles: {
    article: {
      title: "title",
      description: "description",
      body: "this is body",
      author: {
        username: "henry"
      }
    }
  }
};

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
const push = jest.fn;
const createtArticles = jest.fn;

const props = {
  articleDta,
  createtArticles,
  history: { push }
};
describe("<ArticleCreate />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ArticleCreate {...props} />);
  });

  it("matches snapshort", () => {
    const shallowrapper = shallow(<ArticleCreate />);
    expect(shallowrapper).toMatchSnapshot();
  });

  it("should render an <ArticleCreate> element", () => {
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
    const instance = wrapper.instance();
    wrapper.setState({ tagList: ["one two three four"] });
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
    expect(wrapper.state("article").body).toEqual("this is body");
  });

  it("should call mapstates to props ", () => {
    wrapper.setProps(articleDta);
    expect(mapStateToProps(initialState).article["body"]).toEqual(
      "this is body"
    );
  });
});
