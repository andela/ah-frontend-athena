import React from "react";
import propTypes from 'prop-types'
import "./viewFollowing.scss";

const viewFollowing = (props) => {
  const { Username} = props;
  const { Bio } = props;
  const { Image } = props;
  return (
    <div className="wrapper">
      <div className="img-div">
        <img
          src={Image}
          alt="none"
          className="img-cls"
        />
      </div>
      <div className="name-div">
        <p className='U-name'>{Username}</p>
        <p className='U-bio'>{Bio}</p>
        
      </div>
    </div>

  );
};
viewFollowing.propTypes = {
  Username: propTypes.string,
  Bio: propTypes.string,
  Image: propTypes.string
}
viewFollowing.defaultProps = {
  Username: '',
  Bio: '',
  Image: ''
}
export default viewFollowing;
