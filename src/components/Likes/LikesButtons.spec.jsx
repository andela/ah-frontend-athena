import React from "react";
import { shallow } from "enzyme";
import LikesButtons from "./LikesButtons";

let onClick = jest.fn();
let onClick2 = jest.fn();
let like = () => ({ icon1: "", icon2: "" });
let likes_count = "";
let props = {
  onClick,
  onClick2,
  likes_count,
  like
};

describe("Test like buttons", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LikesButtons {...props} />);
  });
  it("Test if like and dislike buttons mount", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
