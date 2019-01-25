import { shallow } from "enzyme";
import React from "react";
import CommentCard from "./CommentCard";

const props = {
  onChange: jest.fn(),
  onSubmitReply: jest.fn()
};
const mockCommentCard = jest.fn();
let wrapper;
describe("CommentCard test", () => {
  beforeEach(() => {
    wrapper = shallow(<CommentCard {...mockCommentCard} />);
  });

  it("matches snapshot", () => {
    const component = shallow(<CommentCard {...mockCommentCard} />);
    expect(component).toMatchSnapshot();
  });
  it("should render a form", () => {
    expect(wrapper.find("form")).toHaveLength(1);
  });

  it("should simulate onChange event", () => {
    wrapper.find({ id: "reply" }).simulate("change", {
      target: { name: "comment_body", value: "Hello kasule" }
    });
    expect(props.onChange).calledOnce;
  });
});
