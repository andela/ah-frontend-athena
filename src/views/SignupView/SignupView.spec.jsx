import React from "react";
import { shallow } from "enzyme";
import { Signup, mapStateToProps } from "./SignupView";

let props = {
  mockSignUpFn: jest.fn()
};
const initialState = {
  user: {
    user: {
      username: "kasule",
      email: "",
      password: "",
      errors: {}
    }
  }
};
let wrapper;

describe("test signup view", () => {
  beforeEach(() => {
    wrapper = shallow(<Signup {...props} />);
  });
  it("should SignupComponent match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("test handle onsubmit event", () => {
    wrapper.instance().onSubmit({ preventDefault() {} });
    expect(wrapper.state()).toEqual({
      email: "",
      errors: {},
      password: "",
      username: ""
    });
  });

  it("should handle onchange function", () => {
    wrapper
      .instance()
      .onChange({ target: { name: "email", value: "kasule@andela.com" } });
    expect(wrapper.state("email")).toEqual("kasule@andela.com");
  });

  it("should will recieve signup props", () => {
    wrapper.setProps({
      data: { errors: "username should be between 3 to 8 characters" }
    });
    expect(wrapper.state("errors")).toEqual({
      errors: "username should be between 3 to 8 characters"
    });
  });

  it("should map state to props", () => {
    expect(mapStateToProps(initialState).data["username"]).toEqual("kasule");
  });
});
