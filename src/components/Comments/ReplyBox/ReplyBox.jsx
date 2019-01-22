import React from "react";
import PropTypes from "prop-types";
import { MDBInput, MDBContainer, MDBCardBody, MDBCard, MDBBtn } from "mdbreact";
import { connect } from "react-redux";
import { CommentAction } from "../../../actions/CommentActions/CommentAction";
import "./ReplyBox.scss";
import { CommentEditAction } from "../../../actions/CommentActions/CommentEditAction";
import {
  ReplyPostAction,
  CommentGetAction
} from "../../../actions/CommentActions/CommentGetAction";

let token = window.localStorage.getItem("token");

class ReplyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = e => {
    e.preventDefault();
    if (!token) {
      console.log("hey");
    } else {
      const commentobj = this.state;
      const comment = {
        comment_body: commentobj.comment_body,
        id: commentobj.id,
        author: commentobj.author
      };
      const { CommentAction } = this.props;
      CommentAction(comment);
    }
  };

  onSubmitReply = id => {
    const commentobj = this.state;
    const comment = {
      comment_body: commentobj.comment_body
    };
    const {
      ReplyPostAction,
      CommentEditAction,
      CommentAction,
      slug,
      isEdit
    } = this.props;
    if (isEdit) {
      if (id === null) {
        CommentAction(comment, slug);
      } else {
        CommentEditAction(id, slug, comment);
      }
    } else {
      const { parentId, slug } = this.props;
      if (parentId && slug) {
        ReplyPostAction(id, comment, slug);
      } else {
        CommentAction(comment, slug);
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { childId } = this.props;
    return (
      <div className="">
        <MDBContainer className="my-3 mx-0 px-0">
          <MDBCard className="w-75">
            <MDBCardBody>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.onSubmitReply(childId);
                }}
              >
                <MDBInput
                  onChange={this.onChange}
                  label="add comment"
                  name="comment_body"
                  type="textarea"
                  id="reply"
                  cols="30"
                  rows="2"
                  required
                />
                <p />
                <MDBBtn
                  className="m-1 p-1 left ml-4"
                  color="primary"
                  type="submit"
                >
                  comment
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    );
  }
}

ReplyBox.propTypes = {
  CommentAction: PropTypes.func,
  ReplyPostAction: PropTypes.func,
  CommentEditAction: PropTypes.func,
  slug: PropTypes.string,
  isEdit: PropTypes.bool,
  parentId: PropTypes.number,
  childId: PropTypes.number
};
ReplyBox.defaultProps = {
  CommentAction: () => {},
  ReplyPostAction: () => {},
  CommentEditAction: () => {},
  slug: "",
  isEdit: false,
  parentId: null,
  childId: null
};
const mapStateToProps = state => {
  return {
    currentUser: state.login.login,
    slug: state.articles.view_article.slug
  };
};

export default connect(
  mapStateToProps,
  { CommentAction, ReplyPostAction, CommentGetAction, CommentEditAction }
)(ReplyBox);
