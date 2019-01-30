import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getMyBookmarkedArticlesAction } from "../../actions/getMyBookmarkedArticlesAction";
import BookmarkedList from "../../components/BookmarksList/BookmarksList";

export class BookmarksView extends Component {
  /**
   *
   * @param {} props - props passed into the JSX initialisation of the component
   */
  constructor(props) {
    super(props);
    this.state = { toBeRendered: "No bookmarks available", noData: true };
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");
    const { getMyBookmarkedArticlesAction } = this.props;
    getMyBookmarkedArticlesAction(token);
  }
  /**
   * Receives props after action is dispatched.
   * @param {} nextProps - properties object that is updated when an
   * action is dispatched and mapStateToProps below is invoked.
   */
  componentWillReceiveProps(nextProps) {
    const bookmarks = nextProps.bookmarks;
    const { history } = this.props;
    if (bookmarks) {
      if (bookmarks.detail) {
        this.setState({ toBeRendered: bookmarks.detail, noData: true });
        toast.error(bookmarks.detail + " Redirecting..."); //session in no longer valid, please login again.
        history.push("/login");
      }
      if (bookmarks.bookmark) {
        this.setState({
          toBeRendered: bookmarks.bookmark,
          noData: false
        });
      }
      if (bookmarks.message) {
        this.setState({ toBeRendered: bookmarks.message, noData: true });
      }
    }
  }
  render() {
    const { noData, toBeRendered } = this.state;
    if (noData) {
      return (
        <h4
          className="d-flex justify-content-center"
          style={{ marginTop: "20%" }}
        >
          You don&apos;t have any bookmarks
        </h4>
      );
    } else {
      return <BookmarkedList articles={toBeRendered} />;
    }
  }
}

BookmarksView.propTypes = {
  history: PropTypes.shape({}),
  bookmarks: PropTypes.shape({}).isRequired,
  getMyBookmarkedArticlesAction: PropTypes.func.isRequired
};
BookmarksView.defaultProps = {
  history: {}
};

/**
 * Filters which state values are mapped to current component's props.
 * @param {} state - state object passed down from the root reducer
 */
export const mapStateToProps = state => ({
  bookmarks: state.bookmarks.bookmarksData
});

export default connect(
  mapStateToProps,
  { getMyBookmarkedArticlesAction }
)(BookmarksView);
