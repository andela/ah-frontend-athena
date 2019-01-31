import React from "react";
import { shallow } from "enzyme";
import { ReportView } from "./ReportView";

let props = {
  ReportArticleAction: jest.fn(),
  article: {}
};
let wrapper;

describe("test report article view", () => {
  beforeEach(() => {
    wrapper = shallow(<ReportView {...props} />);
  });
  it("should match snapshots", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should mock handle submit", () => {
    wrapper.instance().handleSubmit({ preventDefault() {} });
    expect(props.ReportArticleAction).toBeCalled()
  });
  it('should mock handle change', () => {
    wrapper.instance().handleChange({ target: { name: "reason", value: "bad article" } });
  })
});
