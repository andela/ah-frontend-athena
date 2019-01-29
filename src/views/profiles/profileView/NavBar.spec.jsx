import React from "react";
import { shallow } from "enzyme";
import { NavBar, mapStateToProps, limitBio } from "./NavBar";
import avatar from "../../../components/profile/img/default.png";

const props = {
  sortImage: jest.fn(),
  classValue: jest.fn(),
  Click: jest.fn(),
  attribute: jest.fn(),
  Clicked: jest.fn(),
  Edit: jest.fn(),
  profile: {},
  getProfile: jest.fn(),
  user: ""
};
const initialState = {
  show: "dropdown-menu col-md-12 school-options-dropdown text-center ",
  isShow: false,
  profile: { data: { username: "ntale" } },
  classValue: "d-none",
  isLoggedIn: false,
  user: "",
  image: avatar,
  follow: {
    data: [],
    followers: []
  }
};
let wrapper;
describe("NavBar", () => {
  beforeEach(() => {
    wrapper = shallow(<NavBar {...props} />);
  });
  it("compare component snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should show a dropdown", () => {
    wrapper.instance().toggleNow({ preventDefault() {} });
    expect(wrapper.state("show")).toEqual(
      "dropdown-menu dropdown-menu-left dropdown-secondary show"
    );
  });
  it("should show image", () => {
    wrapper.instance().sortImage(initialState);
    expect(wrapper.state("image")).toEqual("default.png");
  });
  it("should map state to props", () => {
    expect(mapStateToProps(initialState).profile["username"]).toEqual("ntale");
  });
  it("should receive props", () => {
    wrapper.setProps({ profile: { username: "shadik", email: "", bio: "" } });
    expect(wrapper.state("profile")["username"]).toEqual("shadik");
  });
  it("should receive props", () => {
    wrapper.setProps({ profile: {} });
    expect(wrapper.state("profile")).toEqual({});
  });
  it("should logout ", () => {
    wrapper.instance().Click({ preventDefault() {} });
    expect(window.localStorage.getItem("token")).toEqual(null);
  });
  it("should receive props", () => {
    wrapper.setProps({ profile: { username: "", email: "", bio: "" } });
    expect(wrapper.state("profile")["username"]).toEqual(undefined);
  });
  it("should hide avatar if not logged in", () => {
    wrapper.instance().state.image = "";
    wrapper.instance().Edit({ preventDefault() {} });
    expect(wrapper.state("classValue")).toEqual("d-none");
  });
  it("should hide avatar if not logged in", () => {
    wrapper.instance().sortImage({
      profile: { username: "", email: "", bio: "", image: "avatar" }
    });
    expect(wrapper.state("image")).toEqual("avatar");
  });
  it("should hide avatar if not logged in", () => {
    wrapper.instance().state.isShow = false;
    wrapper.instance().toggleNow({ preventDefault() {} });
    expect(wrapper.state("isShow")).toEqual(true);
  });
  it("it limits bio", () => {
    const shortBio = "I am groot";
    const longBio = shortBio.repeat(150);
    const returnedBio = longBio.substring(0, 50) + "...";
    expect(limitBio(shortBio)).toEqual("I am groot");
    expect(limitBio(longBio)).toEqual(returnedBio);
  });
});
