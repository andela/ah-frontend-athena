import { shallow, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CommentEdit from "./CommentEdit";

const props = {
  clickReply: jest.fn(),
  clickDelete: jest.fn(),
  clickEdit: jest.fn(),
  onClick: jest.fn(),
};
const onClick = jest.fn()

let store;
const mockStore = configureStore();
store = mockStore({comment: {}});
const mockCommentEdit = jest.fn();
describe("CommentEdit test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CommentEdit {...props} onClick={onClick} />);
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should render a container", () => {
    expect(wrapper.find("span")).toHaveLength(3);
  });

  it("should simulate clickReply event2223", () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <CommentEdit {...props} onClick={onClick} />
      </Provider>)
      wrapper2.find('span').first().simulate('click')
      expect(props.clickReply).toBeCalled()
      
  });

  it("test handle clickDelete event", () => {
    wrapper = shallow(<CommentEdit clickDelete={mockCommentEdit} />);
    wrapper.find('#delete').simulate('click')
    expect(props.clickReply).toBeCalled()
  });

  it("test handle clickedit event", () => {
    wrapper = shallow(<CommentEdit />);
    wrapper.find('#edit').simulate('click')
    expect(props.clickReply).toBeCalled()
  });
});
