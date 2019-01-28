import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Likes } from "./Likes";

let props = {
  returnData: {},
  likesData: {},
  clickLikeIcon: jest.fn(),
  clickDisLikeIcon: jest.fn(),
  getLikeStatus: jest.fn(),
  toggle: jest.fn(),
  article_info: { likes_count: "" }
};
describe("Test like component", () => {
  let wrapper;
  let store;
  beforeEach(() => {
    wrapper = shallow(<Likes {...props} />);
    const mockStore = configureStore();
    store = mockStore();
    localStorage.clear();
  });
  it("Test if component renders", () => {
    expect(wrapper.exists()).toEqual(true);
  });
  it("Test component will receive props", () => {
    wrapper.setProps({
      likesData: {},
      returnData: { like: "true" }
    });
    expect(wrapper.state("like")).toEqual(true);
  });
  it("Test component did mount", () => {
    wrapper.setProps({ likesData: { article: { likes_count: 1 } } });
    expect(wrapper.state("likes_count")).toEqual(1);
  });
  it("Test toggle function", () => {
    wrapper.setProps({
      likesData: { article: { title: "Dragon" } },
      returnData: { like: "true", title: "Dragons" }
    });
    wrapper.setState({ modal: true });
    wrapper.instance().toggle();
    expect(wrapper.state("modal")).toEqual(false);
  });
  it("Test change color", () => {
    expect(wrapper.instance().changeColor("")).toEqual({
      icon1: "blue-grey-text ml-2",
      icon2: "blue-grey-text pr-3"
    });
    expect(wrapper.instance().changeColor(true)).toEqual({
      icon1: "blue-text ml-2",
      icon2: "blue-grey-text pr-3"
    });
    expect(wrapper.instance().changeColor(false)).toEqual({
      icon1: "blue-grey-text ml-2",
      icon2: "blue-text pr-3"
    });
  });
  it("Test click icon 1", () => {
    window.localStorage.setItem("token", "naowna;");
    wrapper = mount(
      <Provider store={store} props={props}>
        <MemoryRouter>
          <Likes {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper
      .find("#likeBtn")
      .first()
      .simulate("click");
    expect(wrapper.instance().props.props.clickLikeIcon).toBeCalled();
  });
  it("test if toggle is called when like icon is clicked", () => {
    wrapper.setState({ url: "" });
    wrapper.instance().clickIcon1();
    expect(wrapper.state("url")).toEqual("/");
  });
  it("test if toggle is called when dislike icon is clicked", () => {
    wrapper.setState({ url: "" });
    wrapper.instance().clickIcon2();
    expect(wrapper.state("url")).toEqual("/");
  });
  it("Test click icon 2", () => {
    window.localStorage.setItem("token", "naowna;");
    wrapper = mount(
      <Provider store={store} props={props}>
        <MemoryRouter>
          <Likes {...props} />
        </MemoryRouter>
      </Provider>
    );
    wrapper
      .find("#unlikeBtn")
      .first()
      .simulate("click");
    expect(wrapper.instance().props.props.clickDisLikeIcon).toBeCalled();
  });
});
