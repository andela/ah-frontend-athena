import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Editor from "../../../components/articles/editor/Editor";
import {
  editArticle,
  getSingleArticle
} from "../../../actions/articleActions/ArticleActions";

export class ArticleEdit extends Component {
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

  componentWillMount() {
    const { getSingleArticle } = this.props;
    const { slug } = this.props;
    getSingleArticle(slug);
  }

  componentWillReceiveProps(nextProps) {
    const article = nextProps.article;
    this.setState(article);
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

  handleTags = tagList => {
    this.setState({ tagList });
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
    const { editArticle } = this.props;
    editArticle(this.state);
  };

  render() {
    const { article_edit } = this.props;
    const { history } = this.props;
    const slug = article_edit.slug;
    if (slug) {
      history.push(`/articles/${slug}`);
    }
    return (
      <Editor
        state={this.state}
        handleChange={this.handleChange}
        handleBodyChange={this.handleBodyChange}
        handleTags={this.handleTags}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    article: state.articles.view_article,
    article_edit: state.articles.edit_article,
    slug: ownProps.match.params.slug
  };
};

ArticleEdit.propTypes = {
  getSingleArticle: PropTypes.func,
  editArticle: PropTypes.func,
  history: PropTypes.shape({}),
  article: PropTypes.shape({}),
  article_edit: PropTypes.shape({}),
  slug: PropTypes.string
};

ArticleEdit.defaultProps = {
  editArticle: () => {},
  getSingleArticle: () => {},
  history: {},
  article: {},
  article_edit: {},
  slug: ""
};

export default connect(
  mapStateToProps,
  { getSingleArticle, editArticle }
)(ArticleEdit);
