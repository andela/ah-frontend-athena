import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ReplyBox, mapStateToProps } from "./ReplyBox";
import { CommentAction } from "../../../actions/CommentActions/CommentAction";
import { CommentEditAction } from "../../../actions/CommentActions/CommentEditAction";
import {
  ReplyPostAction,
  CommentGetAction
} from "../../../actions/CommentActions/CommentGetAction";

let props = {
  mockSignUpFn: jest.fn(),
  isEdit: false, 
};
const initialState = {
  comment: {
    commentList: {},
    comment: {},
    replyList: [],
    refresh: false
  },
  login: {
    login: {
      username: "kasule",
      email: "okello@andela.com",
      password: "",
      errors: ""
    }
  },
  isEdit: false,
  articles: {
    view_article: {
      slug: "someslug"
    }
  }
};
let store;
const mockStore = configureStore();
store = mockStore(initialState);
let wrapper;
const defaultProps ={
  isEdit: false,
  CommentAction: ()=>{},
  CommentEditAction: ()=>{},
  ReplyPostAction:()=>{},
  onSubmitReply: ()=>{},
  onSubmit: ()=>{},
  onChange: ()=>{},
}
const updateProps = props => Object.assign(defaultProps, props);
describe("test ReplyBox view", () => {
  
  
  beforeEach(() => {
    wrapper = shallow(<ReplyBox {...defaultProps} />);
  });
  it("should  ReplyBox match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("test handle onSubmitReply event", () => {
    jest.setTimeout(10000);
    wrapper.setProps({
      isEdit: true
    });
    wrapper.instance().onSubmitReply();

    expect(wrapper.state()).toBe(true);
  });

  it("should handle onchange function", () => {
    wrapper
      .instance()
      .onChange({ target: { name: "comment", value: "my comment" } });
    expect(wrapper.state("comment")).toEqual("my comment");
  });
  it("should handle onsubmit function", () => {
    wrapper.instance().onSubmit({ preventDefault() {} });
    expect(wrapper.state()).toEqual({});
  });
  it("should handle onSubmitReply function", (id = jest.fn()) => {
    wrapper.instance().onSubmitReply(id);
    wrapper.setState({
      isEdit: true
    });
    expect(wrapper.state("isEdit")).toEqual(true);
  });

  it("should recieve props", () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <ReplyBox {...props} />
      </Provider>
    );
    wrapper2.setState({
      isEdit: true
    });
    console.log(wrapper2.instance());

    expect(wrapper2.instance()).toBeCalled(CommentAction);
    expect(wrapper2.state()).toEqual({
      errors: "username should be between 3 to 8 characters"
    });
  });
  it("should map state to props", () => {
    expect(mapStateToProps(initialState).currentUser["username"]).toEqual(
      "kasule"
    );
  });
  it("should test prototype of data", () => {
    const data = {}
    const slug = 'hdj'
    const wrapper2 = mount(
      <Provider store={store}>
        <ReplyBox {...updateProps}  />
      </Provider>
    );
    expect(wrapper2.instance()).toEqual('');
  });
});
