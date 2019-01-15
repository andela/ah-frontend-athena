import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleCreateForm from '../../components/articles/articleCreateForm'
import {createtArticles} from '../../actions/articleActions/ArticleActions'

class Articles extends Component{

  constructor(props){
    super(props)
    this.state = {
        title: '',
        description: '',
        body: '',
        published:true,
        tagList: []
    }
  }
  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleBodyChange = (event) => {
    this.setState({
      body:event
    })
  }

  handleTags = (event) => {
    event.preventDefault()
    let tags = (event.target.value).split(' ')
    this.setState({
      tagList:tags
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if(event.target.name==='draft'){
     this.setState({published:false})
    }else if(event.target.name==='publish'){
      this.setState({published:true})
      this.props.dispatch(createtArticles(this.state, this.props));
    }else if(event.target.name==='edit'){
      console.log('editing mode..........')
    }

    console.log(this.state)
  }

  render(){
    return(
      <ArticleCreateForm
        state={this.state}
        handleChange={this.handleChange}
        handleBodyChange={this.handleBodyChange}
        handleTags={this.handleTags}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

Articles.propTypes = {
  dispatch: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapDispatchToProps)(Articles);

