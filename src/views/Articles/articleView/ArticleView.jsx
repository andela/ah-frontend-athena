import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import renderHTML from "react-render-html";
import ArticleHeader from "../../../components/articles/articleHeader/ArticleHeader";
import {
  getSingleArticle,
  deleteArticle,
  setArticleReadCount
} from "../../../actions/articleActions/ArticleActions";
import {
  followUser,
  unFollowUser,
  getFollowing
} from "../../../actions/userFollowActions";
import "./ArticleView.scss";
import ShareButtons from "../../../components/ShareArticleButtons/ShareArticleButtons";
import Likes from "../../LikesView/Likes";
import ModalPage from "../../../components/Likes/LoginModal";
import RatingView from "../../../components/articles/articleRating/RatingView";
import TagList from "../../TagList/TagList";
import CommentsList from "../../../components/Comments/CommentsList/CommentsList";
import Load from "../../../components/Load/Load";

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
      },
      classValue: "btn primary-color btn-sm btn-outline-primary",
      text: "Follow",
      following: false,
      modal: false,
      load_article_time: ""
    };
  }
  componentDidMount() {
    const { slug } = this.props;
    const { getSingleArticle } = this.props;
    const { getFollowing } = this.props;
    getSingleArticle(slug);
    getFollowing();
    this.setState({ load_article_time: Date.now() });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      view_article: nextProps.view_article
    });
    if ("following" in nextProps.followData) {
      const { following } = nextProps.followData;
      if (following) {
        this.setState({
          classValue: "btn primary-color btn-sm",
          text: "Following",
          following: true
        });
      }
      if (!following) {
        this.setState({
          classValue: "btn primary-color btn-sm btn-outline-primary",
          text: "Follow",
          following: false
        });
      }
    }
    const { followData } = nextProps;
    const { view_article } = nextProps;
    if (Object.entries(view_article).length !== 0) {
      const username = view_article.author.username;
      let following = false;
      if (Array.isArray(followData)) {
        for (let i in followData) {
          following = Object.is(followData[i]["username"], username);
          if (following) {
            this.setState({
              classValue: "btn primary-color btn-sm",
              text: "Following",
              following: true
            });
            break;
          }
        }
        if (!following) {
          this.setState({
            classValue: "btn primary-color btn-sm btn-outline-primary",
            text: "Follow",
            following: false
          });
        }
      }
    }
  }

  componentWillUnmount() {
    const { load_article_time } = this.state;
    const { setArticleReadCount, slug } = this.props;
    let close_article_time = Date.now();
    let time = Math.round((close_article_time - load_article_time) / 1000 / 60);
    setArticleReadCount(slug, time);
  }

  handleClick = () => {
    const { view_article } = this.state;
    const { following } = this.state;
    const { followUser } = this.props;
    const { unFollowUser } = this.props;
    const token = window.localStorage.getItem("token");

    if (token) {
      this.setState({ modal: false });
      const username = view_article.author.username;
      if (following) {
        unFollowUser(username);
      } else {
        followUser(username);
      }
    } else {
      this.setState({ modal: true });
    }
  };

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };
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
    const { view_article, classValue, text, modal } = this.state;
    const { history } = this.props;
    const url = window.location.pathname;
    if (
      Object.keys(view_article).length > 0 &&
      !view_article.errors &&
      view_article.title
    ) {
      const user = window.localStorage.getItem("username");
      let canModify = false;
      let canFollow = false;
      if (view_article.author) {
        canModify = user === view_article.author.username ? true : false;
        canFollow = user === view_article.author.username ? true : false;
      }
      const articleIfo = view_article;
      return (
        <div className="article-page  container">
          <ModalPage
            title="Please login before you can follow a user"
            modal={modal}
            toggle={this.toggle}
            fallback={url}
            history={history}
            md="12"
          />
          <ArticleHeader
            className=" w-100 mb-5"
            article={articleIfo}
            canModify={canModify}
            canFollow={canFollow}
            handleDelete={this.handleDelete}
            handleLink={this.handleLink}
            handleClick={this.handleClick}
            classValue={classValue}
            text={text}
          />
          <div className="mt-2 ml-5 container">
            <RatingView history={history} article={articleIfo} />
          </div>

          <div className="article-body container page mt-5">
            <div className="row article-content">
              <div className="sidebar col-xs-1" style={{ marginRight: "50px" }}>
                <ShareButtons />
              </div>
              <div className="col-md-11">
                <div>{renderHTML(articleIfo.body)}</div>
                <TagList tags={view_article.tagList} view_flag />
              </div>
            </div>
            <hr />
            <Likes article_info={view_article} history={history} />
            <hr />
          </div>
          <div className="mt-5 container">
            <CommentsList slug={view_article.slug} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="center-parent">
          <Load />
        </div>
      );
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.login.login,
    view_article: state.articles.view_article,
    slug: ownProps.match.params.slug,
    followData: state.follow.data
  };
};

ArticleView.propTypes = {
  deleteArticle: PropTypes.func,
  getSingleArticle: PropTypes.func,
  followUser: PropTypes.func,
  unFollowUser: PropTypes.func,
  getFollowing: PropTypes.func,
  view_article: PropTypes.shape({}),
  history: PropTypes.shape({}),
  followData: PropTypes.shape({}),
  slug: PropTypes.string,
  setArticleReadCount: PropTypes.func
};

ArticleView.defaultProps = {
  deleteArticle: () => {},
  getSingleArticle: () => {},
  setArticleReadCount: () => {},
  followUser: () => {},
  unFollowUser: () => {},
  getFollowing: () => {},
  view_article: {},
  followData: {},
  history: {},
  slug: ""
};

export default connect(
  mapStateToProps,
  {
    getSingleArticle,
    deleteArticle,
    followUser,
    unFollowUser,
    getFollowing,
    setArticleReadCount
  }
)(ArticleView);
