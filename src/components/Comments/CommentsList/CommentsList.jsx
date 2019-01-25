import React from "react";
import PropTypes from "prop-types";
import { MDBCard, MDBCardBody, MDBContainer, MDBBadge } from "mdbreact";
import { connect } from "react-redux";
import { CommentAction } from "../../../actions/CommentActions/CommentAction";
import { CommentDeleteAction } from "../../../actions/CommentActions/CommentEditAction";
import {
  ReplyPostAction,
  CommentGetAction
} from "../../../actions/CommentActions/CommentGetAction";
import ReplyBox from "../../../views/CommentView/ReplyBox/ReplyBox";
import {ReplyList} from "../ReplyList/ReplyList";
import CommentEdit from "../CommentEdit/CommentEdit";
import "./CommentsList.scss";

const username = window.localStorage.getItem("username");
export class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentList: [],
      showReplies: "d-none",
      showComBox: "d-none",
      isEdit: false
    };
  }

  componentDidMount() {
    const { CommentGetAction, slug} = this.props;
    CommentGetAction("", slug);
  }

  componentWillReceiveProps(nextProps) {
    const comment = nextProps.data;
    if (comment) {
      this.setState({ comment: comment });
    }
    if (nextProps.commentList) {
      this.setState({ commentList: nextProps.commentList });
    }
    if (nextProps.refresh) {
      if (nextProps.refresh === true) {
        const { slug } = this.props;
        const { CommentGetAction } = this.props;
        CommentGetAction("", slug);
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clickReply = id => {
    const { showComBox } = this.state;
    if (showComBox === "") {
      this.setState({ showComBox: "d-none", isEdit: false });
    } else {
      this.setState({ showComBox: "", isEdit: false });
    }
  };
  clickDelete = id => {
    const myDelete = this.props;
    myDelete.CommentDeleteAction(id, myDelete.slug);
  };
  clickEdit = id => {
    const { showComBox } = this.state;
    if (showComBox === "") {
      this.setState({ showComBox: "d-none", isEdit: true });
    } else {
      this.setState({ showComBox: "", isEdit: true });
    }
  };

  repliesShow = e => {
    const { showReplies } = this.state;
    if (showReplies === "") {
      this.setState({ showReplies: "d-none" + this.state });
    } else {
      this.setState({ showReplies: "" });
    }
  };

  dateToHours = commented_date => {
    const initial_date = commented_date;
    const dateNow = new Date(initial_date);
    return dateNow.getHours();
  };
  render() {
    const { slug } = this.props;
    const { isEdit } = this.state;
    const { showReplies } = this.state;
    const { commentList, showComBox } = this.state;
    
    if (commentList) {
      const list = Object.keys(commentList).map(id => {
        const replies = commentList[id].replies;

        if (replies) {
          return (
            <div key={commentList[id].id} className=" my-0  p-0  container">
              <MDBContainer className="mt-3 p-0 m-0">
                <MDBCard className="mw-80">
                  <MDBCardBody className="mw-100">
                    <h6 className="comment-body">
                      {commentList[id].comment_body}
                    </h6>
                    <div className="col-3 offset-9 border border-white">
                      <div className="date">
                        <MDBBadge color="light" className="mr-2">
                          {this.dateToHours(commentList[id].created_at)}
                        </MDBBadge>
                        Hours ago
                      </div>
                      <div className="mdc-chip">
                        <img
                          src={commentList[id].author.image}
                          className="img-fluid z-depth-1 square mr-2  rounded-circle"
                          alt="Contact Person"
                        />

                        {username}
                      </div>
                    </div>
                    <CommentEdit
                      id={id}
                      clickEdit={this.clickEdit}
                      clickDelete={this.clickDelete}
                      clickReply={this.clickReply}
                      onClick={this.onClick}
                    />
                    <div
                      onClick={this.repliesShow}
                      className="col-4 text-primary"
                    >
                      view all...
                    </div>
                    <div className={showReplies}>
                      <ReplyList
                        repliesShow={this.repliesShow2}
                        slug={slug}
                        onSubmitReply={this.onSubmitReply}
                        parentId={id}
                        replyList={replies}
                      />
                    </div>
                    <div className={showComBox}>
                      <ReplyBox isEdit={isEdit} parentId={id} childId={id} art_slug={slug} />
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
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
                      <div className="col-3 offset-9 border border-white">
                        <div className="date">
                          <MDBBadge color="light" className="mr-2">
                            {this.dateToHours(commentList[id].created_at)}
                          </MDBBadge>
                          Hours ago
                        </div>
                        <div className="mdc-chip">
                          <img
                            src={commentList[id].author.image}
                            className="img-fluid z-depth-1 square mr-2  rounded-circle"
                            alt="Contact Person"
                          />

                          {username}
                        </div>
                      </div>
                      <CommentEdit
                        id={id}
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
      return (
        <div className="m-1 p-1 container">
          <ReplyBox isEdit={isEdit} parentId={null} childId={null} art_slug={slug} />
          {list}
        </div>
      );
    } else {
      return (
        <div>
          <ReplyBox isEdit={isEdit} parentId={null} childId={null} art_slug={slug} />
        </div>
      );
    }
  }
}

CommentsList.propTypes = {
  CommentGetAction: PropTypes.func,
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
  { CommentAction, ReplyPostAction, CommentGetAction, CommentDeleteAction }
)(CommentsList);
