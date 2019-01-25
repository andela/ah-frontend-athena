import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ArticleItem from "../../../components/articles/articleItem/ArticleItem";
import { getArticles } from "../../../actions/articleActions/ArticleActions";
import Paginations from "../../../components/Pagination/Pagination";

export class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      currentPage: {},
      allArticles: {},
      pageNumber: [],
      allPages: {},
      nextLink: {},
      previousLink: {}
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
  }

  componentWillMount() {
    const { getArticles } = this.props;
    getArticles();
  }

  componentWillReceiveProps(nextProps) {
    const articles = nextProps.articles;
    const fullArticle = nextProps.fullArticle;

    if (nextProps.articles) {
      const results = articles;
      this.setState({ articles: results });
    }
    if (fullArticle) {
      this.setState({
        currentPage: fullArticle.current_page,
        allArticles: fullArticle.count,
        allPages: fullArticle.total_pages
      });
    }
  }

  fetchApi = url => {
    fetch(`${url}`, {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          articles: data.articles.results,
          nextLink: data.articles.links.next,
          previousLink: data.articles.links.previous,
          currentPage: data.articles.current_page
        });
      })
      .catch(err => err);
  };

  handleNext = () => {
    const url = this.props.fullArticle.links.next;
    let newUrl = this.state.nextLink;

    if (typeof newUrl === "object") {
      this.fetchApi(url);
      newUrl =
        "https://ah-backend-athena-staging.herokuapp.com/api/articles?limit=5&page=3";
    } else {
      this.fetchApi(newUrl);
    }
  };

  handlePrevious = () => {
    const { previousLink } = this.state;
    let url = previousLink;
    if (url) {
      this.fetchApi(url);
    }
  };

  render() {
    const { articles, currentPage, allArticles, allPages } = this.state;
    let { pageNumber } = this.state;
    pageNumber = [];
    for (let i = 1; i <= Math.ceil(allArticles / 5); i++) {
      pageNumber.push(i);
    }

    if (articles) {
      const list = articles.map(article => {
        return <ArticleItem key={article.id} article={article} />;
      });
      return (
        <div>
          {list}
          <Paginations
            pageNumber={pageNumber}
            currentPage={currentPage}
            allPages={allPages}
            articles={articles}
            nextPage={this.handleNext}
            previousPage={this.handlePrevious}
          />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles,
    fullArticle: state.articles.fullArticle
  };
};

ArticleList.propTypes = {
  getArticles: PropTypes.func,
  articles: PropTypes.shape([]),
  results: PropTypes.shape({}),
  fullArticle: PropTypes.shape({})
};

ArticleList.defaultProps = {
  getArticles: () => {},
  articles: [],
  results: {},
  fullArticle: {}
};

export default connect(
  mapStateToProps,
  { getArticles }
)(ArticleList);
