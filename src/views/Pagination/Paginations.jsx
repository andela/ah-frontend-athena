import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getArticles,
  getMoreArticles
} from "../../actions/articleActions/ArticleActions";
import Pagination from "../../components/Pagination/Pagination";

export class Paginations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: [],
      currentPage: 1,
      searchParam: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      moreArticles,
      currentPage,
      fullArticle,
      update,
      searchParam
    } = nextProps;
    this.setState({
      currentPage: currentPage,
      totalPages: fullArticle.total_pages,
      searchParam: searchParam
    });

    if (moreArticles) {
      if (moreArticles.length === 0) {
        update(fullArticle.results);
      } else {
        update(moreArticles);
      }
    }
  }

  handleNext = () => {
    const { currentPage, searchParam } = this.state;
    const { getMoreArticles } = this.props;
    if (searchParam === "") {
      getMoreArticles(currentPage + 1);
    } else {
      getMoreArticles(currentPage + 1, searchParam);
    }
  };

  handlePrevious = () => {
    const { currentPage } = this.state;
    const { getMoreArticles } = this.props;
    getMoreArticles(currentPage - 1);
  };

  render() {
    const { articles, currentPage, totalPages, searchParam } = this.state;
    const { getMoreArticles } = this.props;

    let { pageNumber } = this.state;
    pageNumber = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumber.push(i);
    }

    return (
      <Pagination
        articles={articles}
        currentPage={currentPage}
        allPages={totalPages}
        nextPage={this.handleNext}
        previousPage={this.handlePrevious}
        pageNumber={pageNumber}
        getMoreArticles={getMoreArticles}
        searchParam={searchParam}
      />
    );
  }
}

Paginations.propTypes = {
  getMoreArticles: PropTypes.func.isRequired,
  moreArticles: PropTypes.shape({}),
  currentPage: PropTypes.shape({}),
  fullArticle: PropTypes.shape({}),
  update: PropTypes.func.isRequired,
  searchParam: PropTypes.shape("")
};

Paginations.defaultProps = {
  moreArticles: {},
  currentPage: {},
  fullArticle: {},
  searchParam: ""
};

export const mapStateToProps = state => {
  return {
    moreArticles: state.articles.articles,
    currentPage: state.articles.currentPage,
    totalPages: state.articles.totalPages,
    searchParam: state.articles.searchParam
  };
};

export default connect(
  mapStateToProps,
  { getMoreArticles, getArticles }
)(Paginations);
