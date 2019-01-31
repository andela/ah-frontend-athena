import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./ReplyList.scss";
import {
  CommentDeleteAction,
  CommentEditAction
} from "../../../actions/CommentActions/CommentEditAction";
import { CommentAction } from "../../../actions/CommentActions/CommentAction";
import {
  ReplyPostAction,
  CommentGetAction
} from "../../../actions/CommentActions/CommentGetAction";
import LoadReply from "../CommentsList/LoadReply";
import LoadNoReply from "./LoadNoReply";

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

  HandleClickLogic = (status1, dnone, status2) => {
    const { showComBox } = this.state;
    if (showComBox === "") {
      this.setState({ showComBox: dnone, isEdit: status1 });
    } else {
      this.setState({ showComBox: status2, isEdit: status1 });
    }
  };

  clickReply = () => {
    this.HandleClickLogic(false, "d-none", "");
  };

  clickDelete = id => {
    const { CommentDeleteAction, slug } = this.props;
    CommentDeleteAction(id, slug);
  };

  clickEdit = () => {
    this.HandleClickLogic("true", "d-none", "");
  };

  dateToHours = commented_date => {
    const initial_date = commented_date;
    const dateNow = new Date(initial_date);
    return dateNow.getHours();
  };

  handleKeyUp = () => {};
  render() {
    const { replyList, show, parentId } = this.props;
    const { isEdit } = this.state;
    const { repliesShow, showReplies, showComBox } = this.state;
    const list = Object.keys(replyList).map(id => {
      const replies = replyList[id].replies;
      if (replies) {
        return (
          <div key={replyList[id].id} className={show}>
            <LoadReply
              comment={replyList[id]}
              id={id}
              clickEdit={this.clickEdit}
              clickDelete={this.clickDelete}
              clickReply={this.clickReply}
              onClick={this.onClick}
              CommentEditAction={CommentEditAction}
              onClick2={this.repliesShow}
              onKeyUp={this.handleKeyUp}
              repliesShow={this.repliesShow2}
              onSubmitReply={this.onSubmitReply}
              parentId={id}
              replyList={replies}
              CommentDeleteAction={CommentDeleteAction}
              isEdit={isEdit}
              parentId2={id}
              childId={id}
              showReplies={showReplies}
              img={replyList[id].author.image}
              showComBox={showComBox}
              username={username}
              dateHour={this.dateToHours(replyList[id].created_at)}
            />
          </div>
        );
      } else {
        return (
          <div key={replyList[id].id} className={show} container>
            <LoadNoReply
              comment={replyList[id]}
              id={id}
              clickEdit={this.clickEdit}
              clickDelete={this.clickDelete}
              clickReply={this.clickReply}
              onClick={this.onClick}
              CommentEditAction={CommentEditAction}
              onClick2={this.repliesShow}
              onKeyUp={this.handleKeyUp}
              repliesShow={this.repliesShow2}
              onSubmitReply={this.onSubmitReply}
              parentId={parentId}
              replyList={replies}
              CommentDeleteAction={CommentDeleteAction}
              isEdit={isEdit}
              parentId2={id}
              childId={id}
              showReplies={showReplies}
              img={replyList[id].author.image}
              showComBox={showComBox}
              username={username}
              dateHour={this.dateToHours(replyList[id].created_at)}
            />
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
  CommentDeleteAction: PropTypes.func.isRequired,
  show: PropTypes.func,
  slug: PropTypes.string
};
ReplyList.defaultProps = {
  replyList: {},
  parentId: null,
  show: () => {},
  slug: ""
};
export const mapStateToProps = state => ({
  slug: state.articles.view_article.slug
});

export const Reply = connect(
  mapStateToProps,
  {
    CommentAction,
    ReplyPostAction,
    CommentGetAction,
    CommentDeleteAction,
    CommentEditAction
  }
)(ReplyList);

export default Reply;
