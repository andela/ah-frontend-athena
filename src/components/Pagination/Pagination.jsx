import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

const Pagination = (props) => {
  const { pageNumber, nextPage, previousPage, currentPage } = props
  const allPages = pageNumber

  if (allPages.length > 0) {
    const list = allPages.map(page => {
      let isActive = false;
      
      if(page===currentPage){
        isActive=true
      }
      return (
        <MDBPageItem active={isActive}>
          <MDBPageNav
            className="page-link"
            id={page}
          >
            {page}
            <span className="sr-only">(current)</span>
          </MDBPageNav>
        </MDBPageItem>
      )
    });
    return(
      <MDBRow>
        <MDBCol>
          <h4 className="title my-5 text-left">{}</h4>
          <MDBPagination circle className="text-center flex-center">
            <MDBPageItem>
              <MDBPageNav 
                className="page-link"
                onClick={previousPage}
              >
                <span>Previous</span>
              </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem disabled>
              <MDBPageNav className="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </MDBPageNav>
            </MDBPageItem>
            {list}
            <MDBPageItem>
              <MDBPageNav className="page-link">
                &raquo;
              </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem>
              <MDBPageNav
                className="page-link"
                onClick={nextPage}
              >
                Next
              </MDBPageNav>
            </MDBPageItem>
          </MDBPagination>
        </MDBCol>
      </MDBRow>
    )
  }else return(
    <div>
      <h3>Oops!</h3>
    </div>
  )
}


export default Pagination;
