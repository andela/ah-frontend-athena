import React from "react";
import propTypes from 'prop-types';
import "./viewFollowers.scss";

const viewFollowers = (props) => {
  const { image } = props;
  const { username } = props;
  const { bio } = props;
  return (
    <div className="wrapper">
      <div className="img-div">
        <img
          src={image}
          alt="none"
          className="img-cls"
        />
      </div>
      <div className="name-div">
        <p className='u-name'>{username}</p>
        <p className='u-bio'>{bio}</p>
        
      </div>
    </div>
  );
};

viewFollowers.propTypes = {
  username: propTypes.string,
  image: propTypes.string,
  bio: propTypes.string
}
viewFollowers.defaultProps = {
  username: '',
  image: '',
  bio: ''

}

export default viewFollowers;
