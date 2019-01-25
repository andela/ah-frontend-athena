import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import { BookmarkAction } from "../../actions/bookmarkAction/BookmarkAction";
import { UnBookmarkAction } from "../../actions/bookmarkAction/UnbookmarkAction";
import { getMyBookmarkedArticlesAction } from "../../actions/getMyBookmarkedArticlesAction";
import ModalPage from "../../components/Likes/LoginModal";

import "./bookmarks.scss";

const token = window.localStorage.getItem("token");
export class Bookmark extends Component {
  state = {
    is_bookmarked: false,
    bookmark: {},
    colorValue: "blue-grey-text ml-2",
    modal: false
  };

  componentDidMount() {
    const { getMyBookmarkedArticlesAction } = this.props;
    getMyBookmarkedArticlesAction(token);
  }

  componentWillReceiveProps(nextProps) {
    const { data, bookmarkChanges } = nextProps;
    const { getMyBookmarkedArticlesAction } = this.props;
    const { articleId } = this.props;
    if (data.bookmark) {
      this.setState({
        colorValue: "blue-grey-text ml-2",
        is_bookmarked: false
      });
      data.bookmark.map(bookmark => {
        if (bookmark.article === articleId) {
          return this.setState({
            bookmark: bookmark,
            colorValue: "blue-text pr-3",
            is_bookmarked: true
          });
        } else {
          return undefined;
        }
      });
    }
    if (bookmarkChanges) {
      getMyBookmarkedArticlesAction(token);
    }
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };

  onClick = () => {
    const { BookmarkAction, UnBookmarkAction, slug } = this.props;
    const { is_bookmarked, bookmark } = this.state;

    if (window.localStorage.getItem("token") != null) {
      if (is_bookmarked) {
        UnBookmarkAction(bookmark.id);
        getMyBookmarkedArticlesAction(token);
      } else {
        BookmarkAction(bookmark, slug);
        getMyBookmarkedArticlesAction(token);
      }
    } else {
      this.setState({ url: window.location.pathname });
      this.toggle();
    }
  };

  render() {
    const { colorValue, url, modal } = this.state;
    const { history } = this.props;

    return (
      <div className={colorValue}>
        <MDBIcon
          size="2x"
          onClick={this.onClick}
          icon="bookmark"
          className="bookmark-icon"
        />
        <ModalPage
          title="Please login before you can like or dislike the article"
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

Bookmark.propTypes = {
  getMyBookmarkedArticlesAction: PropTypes.func.isRequired,
  BookmarkAction: PropTypes.func.isRequired,
  bookmarkChanges: PropTypes.func.isRequired,
  UnBookmarkAction: PropTypes.func.isRequired,
  articleId: PropTypes.number,
  data: PropTypes.shape({}),
  slug: PropTypes.string,
  history: PropTypes.shape({})
};
Bookmark.defaultProps = {
  articleId: 2,
  data: {},
  slug: "mocked-SLUG",
  history: {}
};
export const mapStateToProps = state => {
  return {
    data: state.bookmarks.bookmarksData,
    bookmarkChanges: state.bookmarks.refresh
  };
};
export default connect(
  mapStateToProps,
  { BookmarkAction, UnBookmarkAction, getMyBookmarkedArticlesAction }
)(Bookmark);
