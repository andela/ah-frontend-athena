import React from "react";
import {
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBRow
} from "mdbreact";

const Pagination = ({
  pageNumber,
  nextPage,
  previousPage,
  currentPage,
  getMoreArticles,
  searchParam
}) => {
  let isDisabledNext,
    isDisabledPrevious = false;
  const allPages = pageNumber;

  const onClickHandler = event => {
    if (searchParam === "") {
      getMoreArticles(event.target.id);
    } else {
      getMoreArticles(event.target.id, searchParam);
    }
  };

  if (allPages.length > 0) {
    let lastPage = allPages.length;

    const list = allPages.map(page => {
      let isActive = false;
      if (page === currentPage) {
        isActive = true;
        if (currentPage === 1) {
          isDisabledPrevious = true;
        }
        if (lastPage === currentPage) {
          isDisabledNext = true;
        }
      }

      return (
        <MDBPageItem active={isActive}>
          <MDBPageNav className="link" id={page} onClick={onClickHandler}>
            {page}
            <span className="sr-only">(current)</span>
          </MDBPageNav>
        </MDBPageItem>
      );
    });
    return (
      <MDBRow>
        <MDBCol>
          <h4 className="title my-5 text-left">{}</h4>
          <MDBPagination circle className="text-center flex-center">
            <MDBPageItem disabled={isDisabledPrevious}>
              <MDBPageNav className="page-link" onClick={previousPage}>
                <span>Previous</span>
              </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem disabled={isDisabledPrevious}>
              <MDBPageNav className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </MDBPageNav>
            </MDBPageItem>
            {list}
            <MDBPageItem disabled={isDisabledNext}>
              <MDBPageNav className="page-link">&raquo;</MDBPageNav>
            </MDBPageItem>
            <MDBPageItem disabled={isDisabledNext}>
              <MDBPageNav className="page-link" onClick={nextPage}>
                Next
              </MDBPageNav>
            </MDBPageItem>
          </MDBPagination>
        </MDBCol>
      </MDBRow>
    );
  } else
    return (
      <div>
        <h3>Oops!</h3>
      </div>
    );
};

export default Pagination;
