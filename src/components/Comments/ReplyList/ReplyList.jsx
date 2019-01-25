import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBBadge } from "mdbreact";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {ReplyBox} from "../../../views/CommentView/ReplyBox/ReplyBox";
import "./ReplyList.scss";
import { CommentDeleteAction } from "../../../actions/CommentActions/CommentEditAction";
import {
  ReplyPostAction,
  CommentGetAction
} from "../../../actions/CommentActions/CommentGetAction";
import CommentEdit from "../CommentEdit/CommentEdit";

const username = window.localStorage.getItem("username");

export class ReplyList extends Component {
  constructor(props) {
    super(props);
    this.state = { showReplies: "d-none", showComBox: "d-none", isEdit: false };
  }

  componentDidMount() {
    this.setState({ showReplies: "d-none" });
  }

  repliesShow = () => {
    const { showReplies } = this.state;
    if (showReplies === "") {
      this.setState({ showReplies: "d-none" });
    } else {
      this.setState({ showReplies: "" });
    }
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

  dateToHours = commented_date => {
    const initial_date = commented_date;
    const dateNow = new Date(initial_date);
    return dateNow.getHours();
  };

  render() {
    const { replyList, show, parentId } = this.props;
    const { isEdit } = this.state;
    const { repliesShow, showReplies, showComBox } = this.state;
    
    const list = Object.keys(replyList).map(id => {
      const replies = replyList[id].replies;
      if (replies) {
        return (
          <div key={replyList[id].id} className={show}>
            <MDBContainer className="mw-75p-0 mx-2 my-3">
              <MDBCard className="mw-75 p-0 m-0 ml-5 ">
                <MDBCardBody className="font-italic p-0 m-0 ">
                  <h6 className="comment-body mb-0 col-12">
                    {replyList[id].comment_body}
                  </h6>
                  <div className="col-3 offset-9 border border-white">
                    <div className="date">
                      <MDBBadge color="light" className="mr-2">
                        {this.dateToHours(replyList[id].created_at)}
                      </MDBBadge>
                      Hours ago
                    </div>
                    <div className="mdc-chip">
                      <img
                        src={replyList[id].author.image}
                        className="img-fluid z-depth-1 square mr-2  rounded-circle"
                        alt="Contact Person"
                      />

                      {username}
                    </div>
                  </div>
                  <CommentEdit
                    clickEdit={this.clickEdit}
                    clickDelete={this.clickDelete}
                    id={id}
                    clickReply={this.clickReply}
                  />
                  <div
                    className="col-4 text-primary"
                    onClick={() => {
                      this.repliesShow();
                    }}
                  >
                    view all...
                  </div>
                  <div className={showReplies}>
                    <Reply
                      className="reply-box bg-warn"
                      parentId={id}
                      replyList={replies}
                      show={showReplies}
                    />
                    <div className={showComBox}>
                      <ReplyBox
                        isEdit={isEdit}
                        parentId={parentId}
                        childId={id}
                      />
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          </div>
        );
      } else {
        return (
          <div key={replyList[id].id} className={show} container>
            <MDBContainer fluid className="mw-75 ml-5 p-0 mx-1 my-3">
              <MDBCard className="mw-75 p-0 m-0">
                <MDBCardBody className="mw-75 m-0 p-2 ">
                  <h6 className="comment-body mb-0 col-12">
                    {replyList[id].comment_body}
                  </h6>
                  <div className="col-3 offset-9 border border-white">
                    <div className="date">
                      <MDBBadge color="light" className="mr-2">
                        {this.dateToHours(replyList[id].created_at)}
                      </MDBBadge>
                      Hours ago
                    </div>
                    <div className="mdc-chip">
                      <img
                        src={replyList[id].author.image}
                        className="img-fluid z-depth-1 square mr-2  rounded-circle"
                        alt="Contact Person"
                      />

                      {username}
                    </div>
                  </div>
                </MDBCardBody>
                <CommentEdit
                  clickEdit={this.clickEdit}
                  clickDelete={this.clickDelete}
                  id={id}
                  clickReply={this.clickReply}
                />
                <Reply parentId={id} replyList={{}} />
                <div className={showComBox}>
                  <ReplyBox isEdit={isEdit} parentId={parentId} childId={id} />
                </div>
              </MDBCard>
            </MDBContainer>
          </div>
        );
      }
    });
    return <div className={repliesShow}>{list}</div>;
  }
}
ReplyList.propTypes = {
  replyList: PropTypes.shape({}),
  parentId: PropTypes.string,
  show: PropTypes.func
};
ReplyList.defaultProps = {
  replyList: {},
  parentId: null,
  show: () => {}
};
export const mapStateToProps = state => ({
  isEdit: state.isEdit
});

export const Reply = connect(
  mapStateToProps,
  { ReplyPostAction, CommentGetAction, CommentDeleteAction }
)(ReplyList);

export default Reply;
