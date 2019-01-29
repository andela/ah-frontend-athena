import React from "react";
import { shallow } from "enzyme";
import { SearchForm } from "./SearchForm";

describe("<Search>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SearchForm />);
  });
  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
