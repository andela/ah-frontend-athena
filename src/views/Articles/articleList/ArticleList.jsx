import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MDBContainer, MDBCol, MDBRow } from "mdbreact";
import ArticleItem from "../../../components/articles/articleItem/ArticleItem";
import { getArticles } from "../../../actions/articleActions/ArticleActions";
import getTags from "../../../actions/tagsAction";
import TagsForm from "../../../components/Tags/TagsForm/TagsForm";

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
    const articles = nextProps.articles;
    if (nextProps.articles) {
      const results = articles;
      this.setState({ articles: results });
    }
  }

  render() {
    const { articles } = this.state;
    const { tags } = this.props;

    if (articles) {
      const art = articles.map(article => {
        return <ArticleItem key={article.id} article={article} />;
      });
      return (
        <MDBContainer className="pl-3">
          <MDBRow>
            <MDBCol size="9" className="w-100 m-0">
              {art}
            </MDBCol>
            <MDBCol size="3" className="position-sticky m1">
              <TagsForm tags={tags} />
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => {
  return {
    articles: state.articles.articles,
    tags: state.tags.tags
  };
};

ArticleList.propTypes = {
  getArticles: PropTypes.func,
  getTags: PropTypes.func,
  articles: PropTypes.shape([]),
  results: PropTypes.shape({}),
  tags: PropTypes.shape([])
};

ArticleList.defaultProps = {
  getArticles: () => {},
  getTags: () => {},
  articles: [],
  results: {},
  tags: []
};

export default connect(
  mapStateToProps,
  { getArticles, getTags }
)(ArticleList);
