import React from "react";
import renderHTML from "react-render-html";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import "./ArticleItem.scss";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBView
} from "mdbreact";
import bodyLimit from "../../../utils/helpers";

export const getDate = str => {
  let date = new Date(str);
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
const ArticleItem = props => {
  const { article } = props;
  
  return (
    <MDBContainer fluid className="w-100 ">
      <MDBCard className="my-3 pb-5 mw-100">
        <MDBCardBody>
          <MDBRow>
            <MDBCol lg="5" xl="4">
              <MDBView
                hover
                className="rounded z-depth-1-half mb-lg-0 mb-1 bg-primary h-100"
              >
                <img
                  className="img-fluid h-100 w-100"
                  src="https://mdbootstrap.com/img/Photos/Others/images/52.jpg"
                  alt=""
                />
                <a href="#!">
                  <MDBMask overlay="white-slight" />
                </a>
              </MDBView>
            </MDBCol>
            <MDBCol lg="7" xl="8">
              <h3 className="font-weight-bold mb-3 p-0">
                <strong>{article.title}</strong>
              </h3>
              <p className="dark-grey-text">
                {renderHTML(bodyLimit(article.body, 100))}
              </p>
              <p>
                by
                <a href="#!" className="font-weight-bold">
                  {article.author.username}
                </a>
                {getDate(article.created_at)}
              </p>
              <div className="my-2">
                <p className='read-time'>{article.read_time + " min read"}</p>
                <NavLink to={`/articles/${article.slug}`}>
                  {" "}
                  Read more....
                </NavLink>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

ArticleItem.propTypes = {
  article: PropTypes.shape({})
};

ArticleItem.defaultProps = {
  article: {
    body: "",
    author: { username: "", created_at: new Date("2019-01-19T10:42:09.625Z") }
  }
};

export default ArticleItem;
