import React from "react";
import { shallow } from "enzyme";
import { BookmarksView, mapStateToProps } from "./BookmarksView";

let props = {
  message: "Bookmarks not found",
  getMyBookmarkedArticlesAction: jest.fn(),
  history: { push: jest.fn }
};
const initialState = { bookmarks: { bookmarksData: "mock bookmarks data" } };

describe("Testing the BookmarksView component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BookmarksView {...props} />);
  });

  it("should render the component properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it("should test that the component exists", () => {
  //   expect(wrapper.exists()).toEqual(true);
  // });

  it("should handle props correctly", () => {
    wrapper.setProps({ ...props });
    expect(wrapper.instance().props.message).toEqual("Bookmarks not found");
  });

  it("should handle the case when bookmarked articles data is not available (no bookmarks)", () => {
    wrapper.setProps({
      bookmarks: { message: "Bookmarks not found" }
    });
    expect(wrapper.state("toBeRendered")).toEqual("Bookmarks not found");
  });

  it("should handle the case when bookmarked articles data is not available (error)", () => {
    wrapper.setProps({
      bookmarks: { detail: "some mocked error" }
    });
    expect(wrapper.state("toBeRendered")).toEqual("some mocked error");
  });

  it("should handle the case when bookmarked articles data is available", () => {
    wrapper.setProps({
      bookmarks: { bookmark: ["mockArticle1", "mockArticle2"] }
    });
    expect(wrapper.state("toBeRendered")).toEqual([
      "mockArticle1",
      "mockArticle2"
    ]);
  });

  it("should map state to props via mapStateToProps", () => {
    expect(mapStateToProps(initialState).bookmarks).toEqual(
      "mock bookmarks data"
    );
  });
});
