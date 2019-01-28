import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TagsForm from "./TagsForm";

let tags = [
  { id: 1, tag: "react", slug: "react" },
  { id: 2, tag: "angular", slug: "angular" }
];

let forEach = jest.fn;
let push = jest.fn;
let tag = "react";
let props = {
  tags,
  forEach,
  push,
  tag
};
describe("<TagsForm />", () => {
  let wrapper;
  const mockStore = configureStore();
  let store;
  store = mockStore({});

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <TagsForm />
      </Provider>
    );
  });

  it("matches render tagList", () => {
    expect(wrapper.find("TagList")).toHaveLength(1);
  });

  it("matches call forEach method", () => {
    wrapper.setProps(props);
    expect(forEach);
  });
});
