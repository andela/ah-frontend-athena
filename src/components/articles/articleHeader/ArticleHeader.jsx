import React from "react";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import FollowButton from "../../userFollowing/followButton/userFollowing";
import "./ArticleHeader.scss";
import ArticleOptions from "../articleOptions/ArticleOptions";

const ArticleHeader = props => {
  const {
    article,
    canModify,
    handleDelete,
    handleLink,
    classValue,
    handleClick,
    text,
    canFollow
  } = props;
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
                    <FollowButton
                      classValue={classValue}
                      handleClick={handleClick}
                      canFollow={canFollow}
                      text={text}
                    />
                    <div to={`${article.author.username}`} className="author">
                      By:
                      {article.author.username}
                    </div>
                    <span className="date">
                      {new Date(article.created_at).toDateString()}
                    </span>
                    <span className='read-time-2'>{article.read_time+ ' min read'}</span>
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
  handleClick: PropTypes.func,
  classValue: PropTypes.string,
  text: PropTypes.string,
  handleLink: PropTypes.func,
  canModify: PropTypes.bool,
  canFollow: PropTypes.bool,
  article: PropTypes.shape({})
};

ArticleHeader.defaultProps = {
  handleDelete: () => {},
  handleLink: () => {},
  handleClick: () => {},
  classValue: "",
  text: "",
  article: {
    author: { username: "", created_at: new Date("2019-01-19T10:42:09.625Z") }
  },
  canModify: true,
  canFollow: true
};

export default ArticleHeader;
