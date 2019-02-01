import React from "react";
import propTypes from "prop-types";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBContainer
} from "mdbreact";
import "./ReadingStats.scss";

const ReadingStats = props => {
  const { article } = props;
  return (
    <MDBContainer>
      <MDBCol className="flex flex-center">
        <MDBCard className="w-50">
          <MDBCardBody>
            <MDBCardText>
              <MDBRow>
                <MDBCol size="8">
                  <h3 className="font-weight-bold mb-3 p-0">{article.title}</h3>
                </MDBCol>
                <MDBCol size="2">
                  <h1 className="font-weight-bold mb-3 p-0 black-text">
                    {article.read_count}
                  </h1>
                  <span className="black-text">reads</span>
                </MDBCol>
                <MDBCol>
                  <h1 className="font-weight-bold mb-3 p-0 black-text">
                    {article.view_count}
                  </h1>
                  <span className="black-text">views</span>
                </MDBCol>
              </MDBRow>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  );
};
ReadingStats.propTypes = {
  article: propTypes.shape({})
};
ReadingStats.defaultProps = {
  article: {}
};
export default ReadingStats;
