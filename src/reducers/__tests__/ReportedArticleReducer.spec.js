import ReportArticleReducer from "../ReportArticleReducer";
import actionTypes from "../../actions/actionTypes";

const initialState = {
  reportedArticles: {},
  results: {}
};

describe("report article reducer test", () => {
  it("should test empty reducer", () => {
    expect(ReportArticleReducer(undefined, {})).toEqual(initialState);
  });
  it("should test updated state for report", () => {
    const newState = {
      reportedArticles: { articles: [] },
      results: { reported: { article_id: 1 } }
    };
    expect(
      ReportArticleReducer(initialState, {
        type: actionTypes.REPORT_ARTICLES,
        payload: newState
      })
    ).toEqual({
      reportedArticles: {},
      results: {
        reportedArticles: { articles: [] },
        results: { reported: { article_id: 1 } }
      }
    });
  });
  it("shoudl test state for all reported articles", () => {
    const newState = {
      reportedArticles: { articles: [{ article_id: 1 }] },
      results: {}
    };
    expect(
      ReportArticleReducer(initialState, {
        type: actionTypes.GET_REPORTED_ARTICLES,
        payload: newState
      })
    ).toEqual({
      reportedArticles: {
        reportedArticles: { articles: [{ article_id: 1 }] },
        results: {}
      },
      results: {}
    });
  });
});
