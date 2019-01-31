import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CommentAction } from "../../../actions/CommentActions/CommentAction";
import { CommentEditAction, CommentDeleteAction } from "../../../actions/CommentActions/CommentEditAction";
import {
  ReplyPostAction,
  CommentGetAction
} from "../../../actions/CommentActions/CommentGetAction";
import CommentCard from "../../../components/Comments/CommentCard/CommentCard";

export class ReplyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmitReply = id => {
    const commentobj = this.state;

    const {
      ReplyPostAction,
      CommentEditAction,
      CommentAction,
      art_slug,
      isEdit
    } = this.props;
    const comment = {
      comment_body: commentobj.comment_body
    };

    if (isEdit) {
      if (id === null) {
        CommentAction(comment, art_slug);
      } else {
        CommentEditAction(id, art_slug, comment);
      }
    } else {
      const { parentId, art_slug } = this.props;
      if (parentId && art_slug) {
        ReplyPostAction(id, comment, art_slug);
      } else {
        CommentAction(comment, art_slug);
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { childId } = this.props;
    this.onSubmitReply(childId);
  };
  render() {
    const { childId } = this.props;
    return (
      <CommentCard
        childId={childId}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        onSubmitReply={this.onSubmit}
      />
    );
  }
}

ReplyBox.propTypes = {
  CommentAction: PropTypes.func.isRequired,
  ReplyPostAction: PropTypes.func.isRequired,
  CommentEditAction: PropTypes.func.isRequired,
  art_slug: PropTypes.string,
  isEdit: PropTypes.bool,
  parentId: PropTypes.number,
  childId: PropTypes.number
};
ReplyBox.defaultProps = {
  art_slug: "",
  isEdit: false,
  parentId: null,
  childId: null
};
export const mapStateToProps = state => {
  return {
    currentUser: state.login.login,
    art_slug: state.articles.view_article.slug
  };
};

export default connect(
  mapStateToProps,
  { CommentAction, ReplyPostAction, CommentGetAction, CommentEditAction, CommentDeleteAction }
)(ReplyBox);
