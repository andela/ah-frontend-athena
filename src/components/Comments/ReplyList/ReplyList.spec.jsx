import React from 'react';
import { shallow } from 'enzyme';
import ReplyBoxList, { ReplyList, mapStateToProps } from './ReplyList';
import LoadNoReply from './LoadNoReply';

let props = {
  commentList: [],
  showReplies: 'd-none',
  showComBox: 'd-none',
  isEdit: false,
  clickDelete: jest.fn(),
  clickLike: jest.fn(),
  clickDisLike: jest.fn(),
  CommentDislikeAction: jest.fn(),
  CommentLikeAction: jest.fn()
};
const commentData = {
  articles: { view_article: { slug: 'mocked' } },
  replyList: {
    replies: [
      {
        comment_body: 'my comment',
        author: { image: 'url' }
      }
    ]
  }
};

describe('ReplyList test', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle clickReply function sets showcomBox to d-none', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showComBox: '' });
    wrapper.instance().clickReply();
    expect(wrapper.state('showComBox')).toEqual('d-none');
  });
  it('should handle clickReply function sets showcomBox to none', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.instance().clickReply();
    expect(wrapper.state('showComBox')).toEqual('');
  });

  it('should handle clickLike', () => {
    const wrapper = shallow(<ReplyBoxList {...props} />);
    wrapper.setState({ showReplies: 'd-none' });
    wrapper.simulate('onClick');
    wrapper.instance().props.clickLike(1);
    wrapper.instance().props.CommentLikeAction(1, '');

    expect(wrapper.state('showReplies')).toEqual('d-none');
  });

  it('should handle clickDisLike', () => {
    const wrapper = shallow(<ReplyBoxList {...props} />);
    wrapper.setState({ showReplies: 'd-none' });
    wrapper.instance().props.clickDisLike(1);

    expect(wrapper.state('showReplies')).toEqual('d-none');
  });

  it('should handle clickDelete', () => {
    const wrapper = shallow(<ReplyBoxList {...props} />);
    wrapper.setState({ showReplies: 'd-none' });
    wrapper.instance().props.clickDelete(1);

    expect(wrapper.state('showReplies')).toEqual('d-none');
  });

  it('should handle clickEdit and set edit to true', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showComBox: '' });
    wrapper.instance().clickEdit(1);
    expect(wrapper.state('showComBox')).toEqual('d-none');
  });

  it('should handle clickEdit when showcomBox is set to d-none', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showReplies: '' });
    wrapper.instance().clickEdit(1);
    expect(wrapper.state('showReplies')).toEqual('');
  });

  it('should handle repliesShow and set repliesShow to d-none', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showReplies: '' });
    wrapper.instance().repliesShow();
    expect(wrapper.state('showReplies')).toEqual('d-none');
  });

  it('should handle repliesShow and set repliesShow to none', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.setState({ showReplies: 'd-none' });
    wrapper.instance().repliesShow();
    expect(wrapper.state('showReplies')).toEqual('');
  });

  it('should handle dateToHours', () => {
    const wrapper = shallow(<ReplyList {...props} />);
    wrapper.instance().dateToHours();
    expect(wrapper.state('isEdit')).toEqual(false);
  });

  it('should will recieve reply props', () => {
    const wrapper = shallow(<ReplyBoxList {...props} />);
    wrapper.setProps({ commentData });
    expect(wrapper.instance().props.commentData).toEqual(commentData);
  });

  it('should map state to props', () => {
    expect(mapStateToProps(commentData)).toEqual({ slug: 'mocked' });
  });

  it('snapshot LoadNoReply dump component', () => {
    const image = { comment: { author: { image: 'url' } } };
    const wrapper = shallow(<LoadNoReply {...image} />);
    expect(wrapper).toMatchSnapshot();
  });
});
