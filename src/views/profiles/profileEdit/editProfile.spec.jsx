import React from "react";
import { mount } from "enzyme";
import { profileEdit as Profile, mapStateToProps } from "./profileEdit";

let updateProfile = jest.fn();
let getProfile = jest.fn();
let Change = jest.fn();
let push = jest.fn();
const props = {
  Submit: jest.fn(),
  Change,
  onChange: jest.fn(),
  updateProfile,
  getProfile,
  data: {},
  history: { push }
};
const state = {
  profile: {
    data: { username: "", email: "", bio: "", image: "url" }
  }
};
const ownProps = {
  match: {
    params: {
      username: ""
    }
  }
};
describe("test profile edit component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Profile {...props} />);
  });
  it("should set state on change", () => {
    wrapper
      .instance()
      .Change({ target: { name: "email", value: "me@andela.com" } });
    expect(wrapper.state("email")).toEqual("me@andela.com");
  });
  it("should submit changes", () => {
    wrapper.find("form").simulate("submit", {
      target: { username: "ntale", email: "", bio: "", image: "" }
    });
    expect(updateProfile).toBeCalled();
  });
  it("should post image to cloudinary", () => {
    const fileContent = "file contents";
    const file = new Blob([fileContent], { type: "image/gif" });
    wrapper
      .find("input")
      .first()
      .simulate("change", { target: { files: [file] } });
    expect(updateProfile).toBeCalled();
  });
  it("test component should receive props", () => {
    wrapper.setState({
      profile: { username: "", email: "", bio: "", image: "" }
    });
    wrapper.setProps({
      profile: { username: "shadik", email: "", bio: "", image: "" }
    });
    expect(wrapper.state("username")).toEqual("shadik");
  });
  it("should map state to props", () => {
    expect(mapStateToProps(state, ownProps).profile["image"]).toEqual("url");
  });
});
