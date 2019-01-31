import React from "react";
import { shallow } from "enzyme";
import { ReportArticle } from "./ReportArticle";
import { ReportedArticles, mapStateToProps } from "./ReportedArticles";

let props = { modal: {}, close: {}, article: {} };
let props2 = {
  GetReportedAction: jest.fn(),
  reportedArticles: {}
};
let wrapper;
let wrap;

describe("test report article component", () => {
  beforeEach(() => {
    wrapper = shallow(<ReportArticle {...props} />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe("test reported articles", () => {
  beforeEach(() => {
    wrap = shallow(<ReportedArticles {...props2} />);
  });
  it("should match snapshot", () => {
    expect(wrap).toMatchSnapshot();
  });
  it("will receive props", () => {
    wrap.setProps({
      reportedArticles: [
        {
          article_id: 1,
          article_slug: "i-was-the-first-05a811f9f44e",
          reported_by: {
            username: "lugada",
            bio: "",
            image: "",
            email: "lugjosh@gmail.com"
          },
          reason: "this article does not look good",
          reported_at: "2019-02-01T08:53:29.993268Z"
        }
      ]
    });
    expect(wrap.instance().state).toEqual({
      reportedArticles: [
        {
          article_id: 1,
          article_slug: "i-was-the-first-05a811f9f44e",
          reason: "this article does not look good",
          reported_at: "2019-02-01T08:53:29.993268Z",
          reported_by: {
            bio: "",
            email: "lugjosh@gmail.com",
            image: "",
            username: "lugada"
          }
        }
      ]
    });
  });
  it("should map state to props", () => {
    mapStateToProps({report: {reportedArticles: {reportedArticles:{}}}})
  });
});
