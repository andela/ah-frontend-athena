import React, { Component } from 'react';
import Pagination from '../../components/Pagination/Pagination';

class Paginations extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.currentPage = this.currentPage.bind(this)
  }

  nextPage = () => {
    
  }

  previousPage = () => {

  }

  currentPage = () => {

  }

  render() {
    return (
      <Pagination 
        nextPage={this.nextPage}
        previousPage={this.previousPage}
        nowPage={this.currentPage}
      />
    )
  }
}

export default Paginations;
