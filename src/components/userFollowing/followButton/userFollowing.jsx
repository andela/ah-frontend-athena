import React from 'react';
import './userFollowing.scss'

const followButton = (props) => {
  const { handleClick } = props;
  const { text } = props;
  const { classValue } = props;
  const { canFollow } = props;

  if(!canFollow){
    return(
      <button
        type="button"
        className={classValue}
        onClick={handleClick}
      >
        {text}
      </button>
    )
  }else{
    return <div />
  }

}
export default followButton;