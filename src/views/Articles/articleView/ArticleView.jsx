import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import ArticleHeader from "../../../components/articles/articleHeader/ArticleHeader";
import CommentsList from "../../../components/Comments/CommentsList/CommentsList";

import {
  getSingleArticle,
  deleteArticle
} from "../../../actions/articleActions/ArticleActions";
import RoundButton from "../../../components/RoundButton/RoundButton";
import "./ArticleView.scss";
import ShareButtons from "../../../components/ShareArticleButtons/ShareArticleButtons";

export class ArticleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view_article: {
        id: 0,
        title: "",
        body: "",
        description: "",
        tagList: [],
        author: {
          username: "",
          bio: "",
          image: "",
          email: ""
        },
        created_at: "",
        updated_at: ""
      }
    };
  }

  componentDidMount() {
    const { slug } = this.props;
    const { getSingleArticle } = this.props;
    getSingleArticle(slug);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      view_article: nextProps.view_article
    });
  }

  handleDelete = event => {
    event.preventDefault();
    const { view_article, deleteArticle, history } = this.props;
    const { slug } = view_article;
    deleteArticle(slug);
    history.push(`/`);
    window.location.reload();
  };
  handleLink = () => {
    const { history } = this.props;
    const { view_article } = this.state;
    history.push(`/articles/edit/${view_article.slug}`);
  };

  render() {
    const { view_article } = this.state;
    if (
      Object.keys(view_article).length > 0 &&
      !view_article.errors &&
      view_article.title
    ) {
      const user = window.localStorage.getItem("username");
      let canModify = false;
      if (view_article.author) {
        canModify = user === view_article.author.username ? true : false;
      }
      const articleIfo = view_article;
      return (
        <div className="article-page  container-fluid ">
          <ArticleHeader
            className=" w-100 mb-5"
            article={articleIfo}
            canModify={canModify}
            handleDelete={this.handleDelete}
            handleLink={this.handleLink}
          />

          <div className="article-body container page mt-5">
            <div className="row article-content">
              <div className="sidebar col-xs-1" style={{ marginRight: "50px" }}>
                <ShareButtons />
              </div>
              <div className="col-md-11">
                <div>{renderHTML(articleIfo.body)}</div>

                <ul className="tag-list" color="secondary">
                  {articleIfo.tagList.map(tag => {
                    return (
                      <li className="list-style-none" key={tag}>
                        <RoundButton
                          background="secondary"
                          icon=""
                          label={tag}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <hr />
          </div>
          <div className="mt-5 container">
            <CommentsList slug={view_article.slug} />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.login.login,
    view_article: state.articles.view_article,
    slug: ownProps.match.params.slug
  };
};

ArticleView.propTypes = {
  deleteArticle: PropTypes.func,
  getSingleArticle: PropTypes.func,
  view_article: PropTypes.shape({}),
  history: PropTypes.shape({}),
  slug: PropTypes.string
};

ArticleView.defaultProps = {
  deleteArticle: () => {},
  getSingleArticle: () => {},
  view_article: {},
  history: {},
  slug: ""
};

export default connect(
  mapStateToProps,
  { getSingleArticle, deleteArticle }
)(ArticleView);
