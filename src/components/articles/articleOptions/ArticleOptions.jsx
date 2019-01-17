import React from "react";
import PropTypes from "prop-types";
import "./ArticleOptions.scss";
import RoundButton from "../../RoundButton/RoundButton";

const ArticleOptions = props => {
  const { canModify } = props;
  const { handleDelete } = props;
  const { handleLink } = props;

  if (canModify) {
    return (
      <div className="d-flex flex-colomn">
        <RoundButton
          icon="edit"
          label="Edit Article"
          hoverClass="hover"
          onClick={handleLink}
        />
        <RoundButton
          icon="trash"
          hoverClass="hover"
          label="Delete Article"
          onClick={handleDelete}
        />
      </div>
    );
  }

  return <span />;
};

ArticleOptions.propTypes = {
  handleDelete: PropTypes.func,
  handleLink: PropTypes.func,
  canModify: PropTypes.bool
};

ArticleOptions.defaultProps = {
  handleDelete: () => {},
  handleLink: () => {},
  canModify: true
};

export default ArticleOptions;
