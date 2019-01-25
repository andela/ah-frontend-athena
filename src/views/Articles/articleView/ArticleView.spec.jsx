import React from "react";
import { shallow } from "enzyme";
import { ArticleView, mapStateToProps } from "./ArticleView";

let push = jest.fn();
let returnData = {};
let deleteArticle = jest.fn();
let view_article = {
  title: "title",
  description: "description",
  body: "this is body",
  author: {
    username: "henry"
  }
};
let props = {
  history: { push },
  returnData,
  deleteArticle,
  canFollow: true,
  canModify: true,
  handleLink: jest.fn(),
  handleClick: jest.fn(),
  toggle: jest.fn(),
  article: {},
  className: "",
  classValue: "",
  text: "",
  view_article
};

let state = {
  login: {
    login: {}
  },
  articles: {
    view_article: {}
  },
  follow: {
    data:{
      
    }
  }
};

let ownProps = {
  match: {
    params: {
      slug: "josh"
    }
  }
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

  it("should call handLink ", () => {
    const instance = wrapper.instance();
    expect(
      instance.handleLink({
        preventDefault: jest.fn,
        push: jest.fn
      })
    );
  });

  it("render no articles", () => {
    wrapper.setProps(view_article);
    expect(wrapper.state.view_article).toEqual(undefined);
  })
  it("will receive props", () => {
    wrapper.setProps({ view_article: { author: { username: "" } } });
    expect(wrapper.state("view_article")).toEqual({ author: { username: "" } });
  });
  it("should map state to props", () => {
    expect(mapStateToProps(state, ownProps).slug).toEqual("josh");
  });
});

describe("test following", () => {
  let wrap;
  beforeEach(() => {
    wrap = shallow(<ArticleView />);
  });
  it("receives props", () => {
    wrap.setProps({ followData: { following: "true" } });
    expect(wrap.state("following")).toEqual(true);
    wrap.setProps({ followData: { following: "" } });
    expect(wrap.state("following")).toEqual(false);
  });
  it("receives props", () => {
    wrap.setProps({
      view_article: { author: { username: "ntale", bio: "", image: "" } }
    });
    expect(wrap.state("view_article")).toEqual({
      author: { bio: "", image: "", username: "ntale" }
    });
  });
  it("receives props", () => {
    wrap.setProps({
      followData: [{ username: "ntale", bio: "", image: "", following: "" }],
      view_article: { author: { username: "ntale", bio: "", image: "" } }
    });
    expect(wrap.state("following")).toEqual(true);
    wrap.setProps({
      followData: [{ username: "ntale", bio: "", image: "", following: "" }],
      view_article: { author: { username: "shadik", bio: "", image: "" } }
    });
  });
  it("calls handleClick method", () => {
    wrap.instance().handleClick();
    wrap.instance().state.following = true;
    window.localStorage.setItem("token", null);
    wrap.instance().handleClick();
    wrap.instance().state.following = false;
    window.localStorage.setItem("token", null);
    wrap.instance().handleClick();
    expect(wrap.state("modal")).toEqual(false);
  });
  it("calls toggle function", () => {
    wrap.instance().toggle();
    expect(wrap.state("modal")).toEqual(true);
  });
})
