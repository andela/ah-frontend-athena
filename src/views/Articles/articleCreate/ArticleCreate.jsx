import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Editor } from "../../../components/articles/editor/Editor";
import { createArticles } from "../../../actions/articleActions/ArticleActions";

export class ArticleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      body: "",
      description: "",
      tagList: [],
      author: {},
      slug: "",
      published: true,
      images: []
    };
  }

  componentWillReceiveProps(nextProp) {
    let article = nextProp.article;
    this.setState({ article });
    if (!article.errors && article.slug) {
      const { history } = this.props;
      history.push(`/articles/${article.slug}`);
    }
  }

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleBodyChange = event => {
    this.setState({
      body: event
    });
  };

  handleTags = event => {
    event.preventDefault();
    let tags = event.target.value;
    this.setState({
      tagList: [tags]
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (event.target.name === "draft") {
      this.setState({
        published: false
      });
    } else if (event.target.name === "publish") {
      this.setState({
        published: true
      });
    }
    const { tagList } = this.state;
    const tags = tagList[0].split(" ");
    const article = { ...this.state, tagList: tags };
    const { createArticles } = this.props;
    createArticles(article);
  };

  render() {
    return (
      <Editor
        handleChange={this.handleChange}
        handleBodyChange={this.handleBodyChange}
        handleTags={this.handleTags}
        handleSubmit={this.handleSubmit}
        state={this.state}
      />
    );
  }
}

export const mapStateToProps = state => {
  return {
    article: state.articles.article
  };
};
ArticleCreate.propTypes = {
  createArticles: PropTypes.func,
  history: PropTypes.shape({})
};

ArticleCreate.defaultProps = {
  createArticles: () => {},
  history: {}
};

export default connect(
  mapStateToProps,
  { createArticles }
)(ArticleCreate);
