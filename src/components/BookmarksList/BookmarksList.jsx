import React from "react";
import PropTypes from "prop-types";

import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import "./BookmarksList.scss";

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const returnArticleTitle = slug => {
  const titleArray = slug.split("-");
  titleArray.pop();
  return capitalizeFirstLetter(titleArray.join(" "));
};
const BookmarkedList = props => {
  const { articles } = props;
  if (articles) {
    return (
      <MDBContainer className="d-flex justify-content-center">
        <MDBListGroup style={{ width: "80%", marginTop: "1rem" }}>
          <h4
            className="d-flex justify-content-center"
            style={{ marginTop: "1rem" }}
          >
            Bookmarks
          </h4>
          {articles.map((article, index) => {
            return (
              <MDBListGroupItem
                href={`/articles/${article.article_slug}`}
                className="view overlay bookmark-article-link"
              >
                <h5>
                  <b>
                    {index +
                      1 +
                      `. ` +
                      returnArticleTitle(article.article_slug)}
                  </b>
                </h5>
              </MDBListGroupItem>
            );
          })}
        </MDBListGroup>
      </MDBContainer>
    );
  } else {
    return (
      <h4
        className="d-flex justify-content-center"
        style={{ marginTop: "20%" }}
      >
        Loading...
      </h4>
    );
  }
};

BookmarkedList.propTypes = {
  articles: PropTypes.shape([]).isRequired
};

export default BookmarkedList;
