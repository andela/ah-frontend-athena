import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArticleItem from "../../../components/articles/articleItem/ArticleItem";
import { getArticles } from "../../../actions/articleActions/ArticleActions";

export class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }
  componentWillMount() {
    const { getArticles } = this.props;
    getArticles();
  }

  componentWillReceiveProps(nextProps) {
    const articles = nextProps.articles;
    if (nextProps.articles) {
      const results = articles;
      this.setState({ articles: results });
    }
  }

  render() {
    const { articles } = this.state;
    if (articles) {
      return articles.map(article => {
        return <ArticleItem key={article.id} article={article} />;
      });
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles
  };
};

ArticleList.propTypes = {
  getArticles: PropTypes.func,
  articles: PropTypes.shape([]),
  results: PropTypes.shape({})
};

ArticleList.defaultProps = {
  getArticles: () => {},
  articles: [],
  results: {}
};

export default connect(
  mapStateToProps,
  { getArticles }
)(ArticleList);
