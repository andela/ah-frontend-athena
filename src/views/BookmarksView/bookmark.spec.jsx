import React from "react";
import { shallow } from "enzyme";
import { Bookmark, mapStateToProps } from "./bookmark";

let props = {
  message: "Article was bookmarked",
  is_bookmarked: false,
  BookmarkAction: jest.fn(),
  getMyBookmarkedArticlesAction: jest.fn(),
  UnBookmarkAction: jest.fn()
};
const initialState = {
  bookmarks: { bookmarksData: "mock bookmarks data" },
  bookmarksChanges: {}
};

describe("Testing the BookmarksView component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Bookmark {...props} />);
  });

  it("should compare the component with the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle props", () => {
    wrapper.setProps({ ...props });
    expect(wrapper.instance().props.message).toEqual("Article was bookmarked");
  });

  it("should handle onclick when isbookmark set to false", (id = jest.fn()) => {
    wrapper.setProps({ ...props });
    wrapper.instance().onClick(id);
    expect(wrapper.state("is_bookmarked")).toEqual(false);
  });

  it("should handle onclick when isbookmark set to true", (id = jest.fn()) => {
    props.is_bookmarked = true;
    wrapper.setProps({ ...props });
    wrapper.instance().onClick(id);
    expect(wrapper.state("is_bookmarked")).toEqual(false);
  });

  it("should handle the case when bookmarked articles data is available", () => {
    wrapper.setProps({
      bookmark: { bookmark: [{ article: "data" }] }
    });
    wrapper.setState({ is_bookmarked: false });
    expect(wrapper.state("is_bookmarked")).toEqual(false);
  });

  it("should map state to props", () => {
    expect(mapStateToProps(initialState).data).toEqual("mock bookmarks data");
  });
});
