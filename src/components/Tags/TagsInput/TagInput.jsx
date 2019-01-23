import React, { Component } from "react";
import TagsInput from "react-tagsinput";
import PropTypes from "prop-types";

import "react-tagsinput/react-tagsinput.css";

class TagInput extends Component {
  state = { tags: [] };

  handleChange = tags => {
    const { handleTags } = this.props;
    this.setState({ tags });
    handleTags(tags, this.state);
  };

  render() {
    const { tagList } = this.props;
    return <TagsInput value={tagList} onChange={this.handleChange} />;
  }
}

TagInput.propTypes = {
  handleTags: PropTypes.func,
  tagList: PropTypes.shape({})
};

TagInput.defaultProps = {
  handleTags: () => {},
  tagList: []
};

export default TagInput;
