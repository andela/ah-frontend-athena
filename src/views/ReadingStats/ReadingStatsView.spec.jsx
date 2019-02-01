import React from "react";
import { shallow } from "enzyme";
import { ReadingStatsView, mapStateToProps } from "./ReadingStatsView";

let props = {
  articles: {},
  returnMyArticles: jest.fn()
};
const initialState = {
  returned_articles: [{ id: 1, title: "dragon" }],
  articles: { articles: [] }
};
describe("Test reading stats", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ReadingStatsView {...props} />);
  });
  it("Test if component renders", () => {
    expect(wrapper.exists()).toEqual(true);
  });
  it("Test component will receive props", () => {
    wrapper.setProps({
      articles: [{ id: 1, title: "Dragons" }, { id: 2, title: "Learn" }]
    });
    expect(wrapper.instance().state.returned_articles).toEqual([
      { id: 1, title: "Dragons" },
      { id: 2, title: "Learn" }
    ]);
  });
  it("Test component did mount", () => {
    expect(wrapper.instance().props.returnMyArticles).toEqual(
      props.returnMyArticles
    );
  });

  it("should handle scenario when nextProps does not contain an articles object", () => {
    wrapper.setProps({ articles: { articles: undefined } });
    expect(wrapper.state("returned_articles")).toEqual({});
  });

  it("test mapStateToProps", () => {
    mapStateToProps(initialState);
    expect(wrapper.instance().props.articles).toEqual({});
  });
});
