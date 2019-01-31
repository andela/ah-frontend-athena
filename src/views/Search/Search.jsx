import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SearchForm from "../../components/Search/SearchForm/SearchForm";
import { getArticles } from "../../actions/articleActions/ArticleActions";
import generateSearchParam from "../../utils/searchParam";

export class Search extends Component {
  state = {
    tag: "",
    keyword: "",
    author: "",
    search_active: false
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { tag, author, keyword } = this.state;
    const { getArticles } = this.props;
    const searchParam = generateSearchParam(tag, author, keyword);

    getArticles(searchParam);
  };

  render() {
    const { search_active } = this.state;
    return (
      <div>
        <SearchForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          search_active={search_active}
        />
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    articles: state.articles.articles
  };
};

Search.propTypes = {
  getArticles: PropTypes.func
};

Search.defaultProps = {
  getArticles: () => {}
};

export default connect(
  mapStateToProps,
  { getArticles }
)(Search);
