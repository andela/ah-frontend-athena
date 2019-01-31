import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import ReadingStats from "../../components/ReadingStats/ReadingStats";
import { getArticles } from "../../actions/articleActions/ArticleActions";

export class ReadingStatsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      returned_articles: {}
    };
  }

  componentDidMount() {
    const { getArticles } = this.props;
    const username = window.localStorage.getItem("username");
    getArticles(`author=${username}`);
  }
  componentWillReceiveProps(nextProps) {
    const { articles } = nextProps;
    if (articles) {
      this.setState({ returned_articles: articles });
    } else {
      this.setState({ returned_articles: {} });
    }
  }
  render() {
    const { returned_articles } = this.state;
    if (JSON.stringify(returned_articles) !== "{}") {
      return returned_articles.map(article => {
        return <ReadingStats key={article.id} article={article} />;
      });
    } else {
      return <div />;
    }
  }
}
export const mapStateToProps = state => {
  return {
    articles: state.articles.articles
  };
};
ReadingStatsView.propTypes = {
  articles: propTypes.shape({}),
  getArticles: propTypes.func
};
ReadingStatsView.defaultProps = {
  articles: {},
  getArticles: () => {}
};

export default connect(
  mapStateToProps,
  { getArticles }
)(ReadingStatsView);
