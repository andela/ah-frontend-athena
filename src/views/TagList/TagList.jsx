import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./TagList.scss";
import { getArticles } from "../../actions/articleActions/ArticleActions";

export class TagList extends Component {
  handleClick = e => {
    e.preventDefault();
    const { getArticles } = this.props;
    getArticles(`tag=${e.target.name}`);
  };
  render() {
    getArticles();
    const { tags } = this.props;
    if (tags) {
      return (
        <div>
          {tags.map(tag => (
            <button
              tabIndex={-1}
              type="button"
              name={tag}
              onClick={this.handleClick}
              to={`/articles/?tag=${tag}`}
              key={tag}
              className="badge btn-click badge-pill p-2 z-depth-0 badge-primary h4 ml-1 px-3 view overlay"
            >
              {tag}
            </button>
          ))}
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  null,
  { getArticles }
)(TagList);

TagList.propTypes = {
  getArticles: PropTypes.func,
  tags: PropTypes.shape([])
};

TagList.defaultProps = {
  getArticles: () => {},
  tags: []
};
