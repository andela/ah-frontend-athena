import React from "react";
import PropTypes from "prop-types";
import "./RoundButton.scss";
import { MDBIcon } from "mdbreact";

export default function RoundButton(props) {
  const { background } = props;
  const { onClick } = props;
  const { label } = props;
  const { hoverClass } = props;
  const { icon } = props;
  const classes = `my-round bg-${background} border relative d-flex flex-row m-1 p-2 align-items-center ${hoverClass}`;
  return (
    <div onClick={onClick} className={classes} role="presentation">
      <MDBIcon icon={icon} className="mr-2" />
      <p className="m-0">{label}</p>
    </div>
  );
}

RoundButton.propTypes = {
  onClick: PropTypes.func,
  background: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  hoverClass: PropTypes.string
};

RoundButton.defaultProps = {
  onClick: () => {},
  background: "",
  label: "",
  icon: "",
  hoverClass: ""
};
