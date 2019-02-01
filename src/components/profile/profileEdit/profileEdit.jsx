import React from "react";
import { MDBInput } from "mdbreact";
import propTypes from "prop-types";
import avatar from "../img/default.png";
import "./profileEdit.scss";

const defaultImg = window.localStorage.getItem("image_url");
const displayImg = (defaultImg, avatar) => {
  if (defaultImg == null) {
    return avatar;
  } else {
    return defaultImg;
  }
};

const profileEdit = props => {
  const { onchange, data, Submit, Change } = props;
  return (
    <div>
      <div className="modal-dialog text-center">
        <div className="col-sm-9 main-section">
          <div className="modal-content">
            <div className="col-12 user-img">
              <img
                src={displayImg(defaultImg, avatar)}
                className="rounded-circle"
                alt=""
              />
              <div className="edit">
                <label htmlFor="file">
                  <i className="fa fa-camera cam" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                    onChange={onchange}
                  />
                </label>
              </div>
            </div>
            <div className="col-12 form-input">
              <form onSubmit={Submit}>
                <div className="form-group">
                  <div className="md-form">
                    <MDBInput
                      type="text"
                      name="username"
                      value={data.username}
                      className="form-control"
                      label="username"
                      onChange={Change}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="md-form">
                    <MDBInput
                      type="email"
                      name="email"
                      value={data.email}
                      className="form-control"
                      label="email"
                      onChange={Change}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="md-form">
                    <MDBInput
                      type="textarea"
                      name="bio"
                      value={data.bio}
                      className="md-textarea form-control"
                      label="bio"
                      onChange={Change}
                      rows="2"
                    />
                  </div>
                </div>
                <button className="btn btn-primary btn-md" type="submit">
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-center">
        <a href="/stats">
          <button className="btn btn-primary btn-m" type="button">
            <span className="white-text">Your reading stats</span>
          </button>
        </a>
      </div>
    </div>
  );
};

profileEdit.propTypes = {
  onchange: propTypes.func,
  data: propTypes.shape({}),
  Submit: propTypes.func,
  Change: propTypes.func
};
profileEdit.defaultProps = {
  onchange: () => {},
  data: {},
  Submit: () => {},
  Change: () => {}
};

export default profileEdit;
