import { shallow } from "enzyme";
import React from "react";
import { ShareArticleButtons } from "./ShareArticleButtons";

describe("Share article buttons tests", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShareArticleButtons />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render 3 share buttons", () => {
    expect(wrapper.find(".share-button").length).toBe(3);
  });
});
