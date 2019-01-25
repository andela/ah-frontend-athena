import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CommentsList, mapStateToProps } from "./CommentsList";

let props = {
  commentList: [
    {
      replies: {},
      author: { image: "" }
    },
    {
      replies: {},
      author: { image: "" }
    },
  ],
  showReplies: "d-none",
  showComBox: "d-none",
  isEdit: false,
  CommentDeleteAction: () => {},
  dateToHours: () => {}
};
const initialState = {
  commentList: {},
  comment: {},
  replyList: [],
  refresh: false,
  login: { login: {} },
  articles: { view_article: {} }
};
const commentData = {
  comment: {
    commentList: [
      {
        comment_body: "my comment",
        author: { image: "url" }
      }
    ]
  }
};
let store;
const mockStore = configureStore();
store = mockStore(initialState);
describe("CommentsList test", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <CommentsList {...props} />
      </Provider>
    );
  });

  it("matches snapshot", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should handle clickReply function sets showcomBox to d-none", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.setState({ showComBox: "" });
    wrapper.instance().clickReply();
    expect(wrapper.state("showComBox")).toEqual("d-none");
  });
  it("should handle clickReply function sets showcomBox to none", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.instance().clickReply();
    expect(wrapper.state("showComBox")).toEqual("");
  });

  it("should handle clickDelete", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.instance().clickDelete(1);
    expect(wrapper.state("showReplies")).toEqual("d-none");
  });

  it("should handle clickEdit and set edit to true", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.setState({ showComBox: "" });
    wrapper.instance().clickEdit(1);
    expect(wrapper.state("showComBox")).toEqual("d-none");
  });

  it("should handle clickEdit when showcomBox is set to d-none", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.setState({ showReplies: "" });
    wrapper.instance().clickEdit(1);
    expect(wrapper.state("showReplies")).toEqual("");
  });

  it("should handle repliesShow and set repliesShow to d-none", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.setState({ showReplies: "" });
    wrapper.instance().repliesShow();
    expect(wrapper.state("showReplies")).toEqual("d-none[object Object]");
  });

  it("should handle repliesShow and set repliesShow to none", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.setState({ showReplies: "d-none" });
    wrapper.instance().repliesShow();
    expect(wrapper.state("showReplies")).toEqual("");
  });

  it("should handle dateToHours", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.instance().dateToHours();
    expect(wrapper.state("isEdit")).toEqual(false);
  });

  it("should handle onchange function", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper
      .instance()
      .onChange({ target: { name: "comment", value: "comment_body" } });
    expect(wrapper.state("comment")).toEqual("comment_body");
  });

  it("should will recieve comments props", () => {
    const wrapper = shallow(<CommentsList {...props} />);
    wrapper.setProps({ commentData });
    expect(wrapper.state("comment")).toEqual({});
  });

  it("should will recieve comments props with a refresh", () => {
    const refresh = true
    const wrapper = shallow(<CommentsList {...props} refresh={refresh} />);
    wrapper.setProps({ refresh: true });
    wrapper.setProps({ commentData });
    expect(wrapper.state('commentList')).toEqual([{"author": {"image": ""}, "replies": {}}, {"author": {"image": ""}, "replies": {}}]);
  });

  it("should map state to props", () => {
    expect(mapStateToProps(commentData).commentList).toEqual([{"author": {"image": "url"}, "comment_body": "my comment"}]);
  });
});
