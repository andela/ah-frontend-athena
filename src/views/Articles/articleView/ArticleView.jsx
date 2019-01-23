import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import ArticleHeader from "../../../components/articles/articleHeader/ArticleHeader";
import {
  getSingleArticle,
  deleteArticle
} from "../../../actions/articleActions/ArticleActions";
import RoundButton from "../../../components/RoundButton/RoundButton";
import "./ArticleView.scss";

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
        <div className="article-page  container-fluid">
          <ArticleHeader
            className=" w-100 mb-5"
            article={articleIfo}
            canModify={canModify}
            handleDelete={this.handleDelete}
            handleLink={this.handleLink}
          />

          <div className="container page mt-5">
            <div className="row article-content">
              <div className="col-xs-12">
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
