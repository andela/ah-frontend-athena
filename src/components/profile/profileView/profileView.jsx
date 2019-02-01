import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "./profileView.scss";

const viewProfile = props => {
  const {
    handleClick,
    classValue,
    Clicked,
    imageShow,
    attribute,
    profile,
    Click,
    Edit,
    followers,
    following
  } = props;
  const Value = `navbar-nav ml-auto nav-flex-icons  ${classValue}`;
  const create = `navbar-brand ${classValue}`;
  let username = window.localStorage.getItem("username");
  let valid = ""
  if(username==="lugada"){
    valid = ""
  }else{
    valid="d-none"
  }
  const display = `navbar-brand ${valid}`
  return (
    <div>
      <nav className="pl-4 position-sticky navbar bg-primary navbar-expand-lg navbar-dark ">
        <span className="navbar-brand "> Author&#39;s Heaven</span>
        <div className="float-right ">
          <Link to="/" className="navbar-brand" onClick={handleClick}>
            Home
          </Link>
          <Link to="/create" className={create}>
            {" "}
            Create Article
          </Link>
          <Link to="/bookmarks" className={create}>
            {" "}
            Bookmarks
          </Link>
          <Link to="/reported-articles" className={display}>
            {" "}
            Reported Articles
          </Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className={Value}>
            <li className="nav-item avatar dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                id="navbarAvatar"
                onClick={Clicked}
                href="blank"
              >
                <img
                  src={imageShow}
                  className="rounded-circle z-depth-0 nav-img"
                  alt=""
                />
              </a>
              <div className="dropdown-container">
                <div className={attribute} aria-labelledby="navbarAvatar">
                  <img
                    src={imageShow}
                    className="rounded-circle drop-img"
                    alt=""
                  />
                  <span className="followers">followers</span>
                  <span className="following">following</span>
                  <a href="/followers">
                    <button type="button" className="round-btn">
                      {followers}
                    </button>
                  </a>
                  <a href="/following">
                    <button type="button" className="round-btn-2">
                      {following}
                    </button>
                  </a>
                  <span className="username">{profile.username}</span>
                  <br />
                  <span className="email">{profile.email}</span>
                  <br />
                  <br />
                  <span className="bio">{profile.bio}</span>
                  <div className="btn-container">
                    <div className="text-center">
                      <button
                        type="submit"
                        name="draft"
                        className="btn btn-danger btn-sm"
                        onClick={Click}
                      >
                        logout
                      </button>
                    </div>
                    <div className="text-center">
                      <a href="/">
                        <button
                          name="publish"
                          onClick={Edit}
                          className="btn btn-success btn-sm"
                          type="button"
                        >
                          view
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
viewProfile.propTypes = {
  classValue: propTypes.string,
  Clicked: propTypes.func,
  handleClick: propTypes.func,
  imageShow: propTypes.string,
  attribute: propTypes.string,
  profile: propTypes.shape({}),
  followers: propTypes.number,
  following: propTypes.number,
  Click: propTypes.func,
  Edit: propTypes.func
};
viewProfile.defaultProps = {
  classValue: "",
  Clicked: () => {},
  handleClick: () => {},
  imageShow: "",
  attribute: "",
  profile: {},
  followers: 0,
  following: 0,
  Click: () => {},
  Edit: () => {}
};
export default viewProfile;
