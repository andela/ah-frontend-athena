import React from 'react';
import PropTypes from 'prop-types';
import { MDBCard, MDBCardBody, MDBContainer, MDBBadge } from 'mdbreact';
import { connect } from 'react-redux';
import {
  CommentAction,
  CommentDislikeAction,
  CommentLikeAction
} from '../../../actions/CommentActions/CommentAction';
import {
  CommentDeleteAction,
  CommentEditAction
} from '../../../actions/CommentActions/CommentEditAction';
import {
  ReplyPostAction,
  CommentGetAction
} from '../../../actions/CommentActions/CommentGetAction';
import ReplyBox from '../../../views/CommentView/ReplyBox/ReplyBox';
import CommentEdit from '../CommentEdit/CommentEdit';
import './CommentsList.scss';
import LoadReply from './LoadReply';
import ModalPage from '../../Likes/LoginModal';

const username = '';
export class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      showReplies: 'd-none',
      showComBox: 'd-none',
      isEdit: false,
      modal: false
    };
  }

  componentDidMount() {
    const { CommentGetAction, slug } = this.props;
    CommentGetAction('', slug);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commentList) {
      this.setState({ commentList: nextProps.commentList });
    }
    if (nextProps.refresh) {
      if (nextProps.refresh === true) {
        const { slug } = this.props;
        const { CommentGetAction } = this.props;
        CommentGetAction('', slug);
      }
    }
  }

  checkToken = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({
        modal: false
      });
    } else {
      this.setState({
        modal: true
      });
      return;
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  HandleClickLogic = (status1, dnone, status2) => {
    const { showComBox } = this.state;
    if (showComBox === '') {
      this.setState({ showComBox: dnone, isEdit: status1 });
    } else {
      this.setState({ showComBox: status2, isEdit: status1 });
    }
  };

  clickLike = id => {
    const { CommentLikeAction, slug } = this.props;
    this.checkToken();
    CommentLikeAction(id, slug);
  };
  clickDisLike = id => {
    this.checkToken();
    const { CommentDislikeAction, slug } = this.props;
    CommentDislikeAction(id, slug);
  };

  clickReply = () => {
    this.checkToken();
    this.HandleClickLogic(false, 'd-none', '');
  };

  clickEdit = () => {
    this.checkToken();
    this.HandleClickLogic('true', 'd-none', '');
  };

  clickDelete = id => {
    this.checkToken();
    const myDelete = this.props;
    myDelete.CommentDeleteAction(id, myDelete.slug);
  };

  repliesShow = () => {
    const { showReplies } = this.state;
    if (showReplies === '') {
      this.setState({ showReplies: 'd-none' + CommentsList.state });
    } else {
      this.setState({ showReplies: '' });
    }
  };

  dateToHours = commented_date => {
    const initial_date = commented_date;
    const dateNow = new Date(initial_date);
    return dateNow.getHours();
  };
  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };

  handleKeyUp = () => {};

  render() {
    const {
      slug,
      CommentEditAction,
      CommentDeleteAction,
      history
    } = this.props;
    const { commentList, showComBox, modal, showReplies, isEdit } = this.state;
    const url = window.location.pathname;
    if (commentList) {
      let list = Object.keys(commentList).map(id => {
        const replies = commentList[id].replies;
        let img = ``;
        const { author } = commentList[id];
        if (author) {
          if (author.image) {
            img = '' + author.image;
          }
        }
        if (replies) {
          return (
            <div key={commentList[id].id} className=" my-0  p-0  container">
              <LoadReply
                comment={commentList[id]}
                id={id}
                clickLike={this.clickLike}
                clickDisLike={this.clickDisLike}
                clickEdit={this.clickEdit}
                clickDelete={this.clickDelete}
                clickReply={this.clickReply}
                onClick={this.onClick}
                CommentEditAction={CommentEditAction}
                onClick2={this.repliesShow}
                onKeyUp={this.handleKeyUp}
                repliesShow={this.repliesShow2}
                slug={slug}
                onSubmitReply={this.onSubmitReply}
                parentId={id}
                replyList={replies}
                CommentDeleteAction={CommentDeleteAction}
                isEdit={isEdit}
                parentId2={id}
                childId={id}
                art_slug={slug}
                showReplies={showReplies}
                img={img}
                history={history}
                showComBox={showComBox}
                username={username}
                dateHour={this.dateToHours(commentList[id].created_at)}
              />
            </div>
          );
        } else {
          return (
            <div key={commentList[id].id} className=" my-0 mx-2 p-0  container">
              <MDBContainer className="mt-3 p-0 m-0">
                <MDBCard className="mw-80">
                  <MDBCardBody className="mw-100">
                    <div key={commentList[id].id}>
                      <h6 className="comment-body">
                        {commentList[id].comment_body}
                      </h6>
                      <div className="col-3 user-info offset-9 border border-white">
                        <div className="date">
                          <MDBBadge color="light" className="mr-2">
                            {this.dateToHours(commentList[id].created_at)}
                          </MDBBadge>
                          Hours ago
                        </div>
                        <div className="mdc-chip">
                          <img
                            src={img}
                            className="img-fluid z-depth-1 square mr-2  rounded-circle"
                            alt="Contact Person"
                          />

                          {username}
                        </div>
                      </div>
                      <CommentEdit
                        id={id}
                        likes={commentList[id].likes_count}
                        clickLike={this.clickLike}
                        clickDisLike={this.clickDisLike}
                        clickEdit={this.clickEdit}
                        clickDelete={this.clickDelete}
                        clickReply={this.clickReply}
                        onClick={this.onClick}
                      />
                    </div>
                    <div className={showComBox}>
                      <ReplyBox parentId={id} childId={id} art_slug={slug} />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
            </div>
          );
        }
      });
      list = list.reverse();
      return (
        <div className="m-1 p-1 container">
          <ReplyBox
            isEdit={isEdit}
            parentId={null}
            childId={null}
            art_slug={slug}
          />
          <ModalPage
            title="Please login before you can rate the article"
            modal={modal}
            toggle={this.toggle}
            fallback={url}
            history={history}
            md="12"
          />
          {list}
        </div>
      );
    } else {
      return (
        <div>
          <ReplyBox
            isEdit={isEdit}
            parentId={null}
            childId={null}
            art_slug={slug}
          />
          <ModalPage
            title="Please first login "
            modal={modal}
            toggle={this.toggle}
            fallback={url}
            history={history}
            md="12"
          />
        </div>
      );
    }
  }
}

CommentsList.propTypes = {
  CommentLikeAction: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
  CommentDislikeAction: PropTypes.func.isRequired,
  CommentGetAction: PropTypes.func,
  CommentEditAction: PropTypes.func.isRequired,
  CommentDeleteAction: PropTypes.func.isRequired,
  slug: PropTypes.shape({}),
  data: PropTypes.shape({}),
  commentList: PropTypes.shape({}),
  refresh: PropTypes.bool
};

CommentsList.defaultProps = {
  CommentGetAction: () => {},
  slug: {},
  data: {},
  commentList: {},
  refresh: false
};

export const mapStateToProps = state => {
  return {
    data: state.comment.comment,
    commentList: state.comment.commentList,
    replyList: state.comment.replyList,
    refresh: state.comment.refresh
  };
};

export default connect(
  mapStateToProps,
  {
    CommentAction,
    ReplyPostAction,
    CommentGetAction,
    CommentDeleteAction,
    CommentEditAction,
    CommentDislikeAction,
    CommentLikeAction
  }
)(CommentsList);
