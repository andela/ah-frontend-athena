import React from "react";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import "./ArticleHeader.scss";
import ArticleOptions from "../articleOptions/ArticleOptions";

const ArticleHeader = props => {
  const { article, canModify, handleDelete, handleLink } = props;
  return (
    <MDBContainer className="mt-5 ">
      <MDBRow>
        <MDBCol>
          <h2 className="h1 display-3 text-bold">{article.title}</h2>
          <div className="article-meta">
            <MDBRow>
              <MDBCol size="4">
                <MDBRow>
                  <img
                    src={`${article.author.image}`}
                    className="img-fluid z-depth-1 square  rounded-circle"
                    alt=""
                  />
                  <div className="d-flex flex-column ml-4 justify-content-end">
                    <div to={`${article.author.username}`} className="author">
                      By:
                      {article.author.username}
                    </div>
                    <span className="date">
                      {new Date(article.created_at).toDateString()}
                    </span>
                  </div>
                </MDBRow>
              </MDBCol>
              <MDBCol size="4">
                <ArticleOptions
                  canModify={canModify}
                  article={article}
                  handleDelete={handleDelete}
                  handleLink={handleLink}
                />
              </MDBCol>
            </MDBRow>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

ArticleHeader.propTypes = {
  handleDelete: PropTypes.func,
  handleLink: PropTypes.func,
  canModify: PropTypes.bool,
  article: PropTypes.shape({})
};

ArticleHeader.defaultProps = {
  handleDelete: () => {},
  handleLink: () => {},
  article: {
    author: { username: "", created_at: new Date("2019-01-19T10:42:09.625Z") }
  },
  canModify: true
};

export default ArticleHeader;
