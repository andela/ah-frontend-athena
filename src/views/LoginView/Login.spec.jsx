import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Login, mapStateToProps } from "./Login";

let login = jest.fn();
let push = jest.fn();
let returnData = {};
let loginProps = {
  login,
  history: { push },
  returnData
};
const initialState = {
  login: {
    login: {
      username: "",
      email: "okello@andela.com",
      password: "",
      errors: ""
    }
  },
  googleLogin: jest.fn(),
  facebookLogin: jest.fn()
};
describe("Test login component", () => {
  const mockStore = configureStore();
  let wrapper;
  let store;
  store = mockStore(initialState);

  beforeEach(() => {
    wrapper = shallow(<Login {...loginProps} />);
  });
  it("Login component", () => {
    expect(wrapper.exists()).toEqual(true);
  });
  it("test handleSubmit function", () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login {...loginProps} />
        </MemoryRouter>
      </Provider>
    );

    wrapper.find("form").simulate("submit", {
      target: { name: "email", value: "okello@andela.com" }
    });
    expect(login).toBeCalled();
  });
  it("test handleChange function", () => {
    wrapper
      .instance()
      .handleChange({ target: { name: "email", value: "okello@andela.com" } });
    expect(wrapper.state("email")).toEqual("okello@andela.com");
  });
  it("test component will receive props ", () => {
    wrapper.setProps({ returnData: { errors: "invalid" } });
    expect(wrapper.state("errors")).toEqual("invalid");
  });
  it("test correct login data, pushes articles page", () => {
    wrapper.setProps({ returnData: { user: "invalid" } });
    expect(push).toBeCalled();
  });
  it("test mapStateToProps", () => {
    expect(mapStateToProps(initialState).returnData["email"]).toEqual(
      "okello@andela.com"
    );
  });
});
