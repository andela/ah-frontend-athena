import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { ReportArticleAction, GetReportedAction } from "../ReportArticleAction";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let token = window.localStorage.getItem("token");

describe("report article actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("mock report article fetch", () => {
    fetchMock.postOnce(
      `${process.env.REACT_APP_API_URL_BASE}articles/first-artcle-123/report/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        },
        body: { report: { reason: "reason" } }
      }
    );
    const expectedActions = [
      { payload: { report: { reason: "reason" } }, type: "REPORT_ARTICLES" }
    ];

    const store = mockStore();

    return store
      .dispatch(ReportArticleAction("first-artcle-123", "bad one"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it("mock report article fetch", () => {
    fetchMock.getOnce(`${process.env.REACT_APP_API_URL_BASE}reported/`, {
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: {}
    });
    const expectedActions = [
      { payload: undefined, type: "GET_REPORTED_ARTICLES" }
    ];

    const store = mockStore();

    return store.dispatch(GetReportedAction()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
