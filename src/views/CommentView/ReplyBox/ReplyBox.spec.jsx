import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ReplyBox, mapStateToProps } from './ReplyBox';

const initialState = {
  comment: {
    commentList: {},
    comment: {},
    replyList: [],
    refresh: false
  },
  login: {
    login: {
      username: 'kasule',
      email: 'okello@andela.com',
      password: '',
      errors: ''
    }
  },
  isEdit: false,
  articles: {
    view_article: {
      slug: 'someslug'
    }
  }
};
let store;
const mockStore = configureStore();
store = mockStore(initialState);
let wrapper;
const defaultProps = {
  isEdit: false,
  CommentAction: jest.fn(),
  CommentEditAction: jest.fn(),
  ReplyPostAction: jest.fn(),
  onSubmitReply: jest.fn(),
  onSubmit: jest.fn(),
  onChange: jest.fn(),
  art_slug: 'mocked-slug',
  parentId: '1'
};

const updateProps = props => Object.assign(defaultProps, props);
describe('test ReplyBox view', () => {
  beforeEach(() => {
    wrapper = shallow(<ReplyBox {...defaultProps} />);
  });
  it('should  ReplyBox match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test handle onSubmitReply event', () => {
    defaultProps.isEdit = true;
    wrapper = shallow(<ReplyBox {...defaultProps} />);
    jest.setTimeout(10000);
    wrapper.instance().onSubmitReply(null);
    expect(defaultProps.CommentAction).toBeCalled();
  });

  it('should handle onchange function', () => {
    wrapper
      .instance()
      .onChange({ target: { name: 'comment', value: 'my comment' } });
    expect(wrapper.state('comment')).toEqual('my comment');
  });

  it('should handle onsubmit function', () => {
    wrapper.instance().onSubmit({ preventDefault() {} });
    expect(wrapper.state()).toEqual({ modal: true });
  });

  it('should handle onSubmitReply function', (id = jest.fn()) => {
    wrapper.instance().onSubmitReply(id);
    wrapper.setState({
      isEdit: true
    });
    expect(wrapper.state('isEdit')).toEqual(true);
  });

  it('should recieve props', () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <ReplyBox {...defaultProps} />
      </Provider>
    );
    wrapper2.setState({
      isEdit: true
    });
    expect(defaultProps.CommentAction).toBeCalled();
    expect(wrapper2.state('isEdit')).toEqual(true);
  });

  it('should map state to props', () => {
    expect(mapStateToProps(initialState).currentUser['username']).toEqual(
      'kasule'
    );
  });

  it('should test prototype of data', () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <ReplyBox {...updateProps} />
      </Provider>
    );
    expect(wrapper2.instance().props.children).toEqual(<ReplyBox />);
  });

  it('test parentID and slug in props', () => {
    defaultProps.isEdit = false;
    wrapper = shallow(<ReplyBox {...defaultProps} />);
    wrapper.instance().onSubmitReply(null);
    expect(defaultProps.ReplyPostAction).toBeCalled();
  });

  it('test parentID and slug in props', () => {
    defaultProps.isEdit = false;
    defaultProps.art_slug = undefined;
    wrapper = shallow(<ReplyBox {...defaultProps} />);
    wrapper.instance().onSubmitReply(null);
    expect(defaultProps.CommentAction).toBeCalled();
  });
});
