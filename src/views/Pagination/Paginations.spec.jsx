import React from "react";
import { shallow } from "enzyme";
import { Paginations, mapStateToProps } from "./Paginations";

let props = {
  getMoreArticles: jest.fn(),
  pageNumber: [],
  update: jest.fn(),
  fullArticle: {total_pages:1}
};


let wrap;

describe("mocking all functions", () => {
  beforeEach(() => {
    wrap = shallow(<Paginations {...props} />);
  });
  it("should match snapshot", () => {
    expect(wrap).toMatchSnapshot();
  });
  it("should mock handle next", () => {
    wrap.instance().handleNext();
  });
  it("should mock handle previous", () => {
    wrap.instance().handlePrevious();
  });
  it("handleNext with search", () => {
    wrap.setProps({ searchParam: "josephat" });
    wrap.instance().handleNext();
    expect(props.getMoreArticles).toBeCalled();
  });
  it('more articles empty array', () => {
    wrap.setProps({ moreArticles: [] });
    expect(props.update).toBeCalled()
  })
  it('map state to props', () => {
    mapStateToProps({articles:{
      articles: [],
      currentPage: 1,
      totalPages: 3,
      searchParam: ""
    }})
    expect(wrap.instance().props.currentPage).toEqual({})
  })
});
