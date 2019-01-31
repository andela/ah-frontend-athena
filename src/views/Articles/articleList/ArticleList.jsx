import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import ArticleItem from "../../../components/articles/articleItem/ArticleItem";
import { getArticles } from "../../../actions/articleActions/ArticleActions";
import getTags from "../../../actions/tagsAction";
import TagsForm from "../../../components/Tags/TagsForm/TagsForm";
import Paginations from "../../Pagination/Paginations";
import Search from "../../Search/Search";
import Load from "../../../components/Load/Load";
import "./ArticleList.scss";

export class ArticleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentWillMount() {
    const { getArticles, getTags } = this.props;
    getTags();
    getArticles();
  }

  componentWillReceiveProps(nextProps) {
    const { articles } = nextProps;
    if (articles) {
      const results = articles;
      this.setState({ articles: results });
    }
  }

  updateArticleList = newArticles => {
    this.setState({ articles: newArticles });
  };

  render() {
    const { articles, totalPages } = this.state;
    const { fullArticle, tags } = this.props;
    let { pageNumber } = this.state;
    pageNumber = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumber.push(i);
    }

    if (articles.length === 0) {
      return (
        <div>
          <h1
            className="d-flex justify-content-center"
            style={{ marginTop: "20%" }}
          >
            There are no articles for this search
          </h1>
        </div>
      );
    } else if (articles) {
      const art = articles.map(article => {
        return <ArticleItem key={article.id} article={article} />;
      });
      return (
        <MDBContainer className="pl-3">
          <MDBRow>
            <MDBCol size="9" className="w-100 m-0">
              {art}
              <Paginations
                fullArticle={fullArticle}
                update={this.updateArticleList}
              />
            </MDBCol>
            <MDBCol size="3" className="position-sticky m1">
              <Search />
              <TagsForm tags={tags} />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    } else {
      return <Load />;
    }
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles,
    tags: state.tags.tags,
    moreArticles: state.articles.articles,
    currentPage: state.articles.currentPage,
    totalPages: state.articles.totalPages,
    fullArticle: state.articles.fullArticle
  };
};

ArticleList.propTypes = {
  getArticles: PropTypes.func,
  getTags: PropTypes.func,
  results: PropTypes.shape({}),
  tags: PropTypes.shape([]),
  articles: PropTypes.shape([]),
  fullArticle: PropTypes.shape({})
};

ArticleList.defaultProps = {
  getArticles: () => {},
  getTags: () => {},
  articles: [],
  results: {},
  tags: [],
  fullArticle: {}
};

export default connect(
  mapStateToProps,
  { getArticles, getTags }
)(ArticleList);