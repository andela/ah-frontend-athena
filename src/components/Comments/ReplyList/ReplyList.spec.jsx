import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ReplyList, mapStateToProps} from "./ReplyList";

let props = {
  commentList: [],
  showReplies: "d-none",
  showComBox: "d-none",
  isEdit: false
};
const initialState = {
  commentList: {},
  comment: {},
  replyList: [],
  refresh: false,
  isEdit: { isEdit: true }
};
let store;
const mockStore = configureStore();
store = mockStore(initialState);
const commentData = {
  replyList: {
    replies: [
      {
        comment_body: "my comment",
        author: { image: "url" }
      }
    ]
  }
};

describe("ReplyList test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <ReplyList {...props} />
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle clickReply function sets showcomBox to d-none", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showComBox: "" });
    wrapper.instance().clickReply();
    expect(wrapper.state("showComBox")).toEqual("d-none");
  });
  it("should handle clickReply function sets showcomBox to none", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.instance().clickReply();
    expect(wrapper.state("showComBox")).toEqual("");
  });

  // it("should handle clickDelete", () => {
  //   const wrapper = shallow(<ReplyList {...props} />);
  //   wrapper.instance().clickDelete(1);
  //   expect(wrapper.state("showReplies")).toEqual("d-none");
  // });

  it("should handle clickEdit and set edit to true", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showComBox: "" });
    wrapper.instance().clickEdit(1);
    expect(wrapper.state("showComBox")).toEqual("d-none");
  });

  it("should handle clickEdit when showcomBox is set to d-none", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showReplies: "" });
    wrapper.instance().clickEdit(1);
    expect(wrapper.state("showReplies")).toEqual("");
  });

  it("should handle repliesShow and set repliesShow to d-none", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showReplies: "" });
    wrapper.instance().repliesShow();
    expect(wrapper.state("showReplies")).toEqual("d-none");
  });

  it("should handle repliesShow and set repliesShow to none", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showReplies: "d-none" });
    wrapper.instance().repliesShow();
    expect(wrapper.state("showReplies")).toEqual("");
  });

  it("should handle dateToHours", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.instance().dateToHours();
    expect(wrapper.state("isEdit")).toEqual(false);
  });

  it("should will recieve reply props", () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setProps({ commentData });
    expect(wrapper.state("isEdit")).toEqual(false);
  });

    it("should map state to props", () => {
      expect(mapStateToProps(commentData)).toEqual({"isEdit": undefined});
    });
});
