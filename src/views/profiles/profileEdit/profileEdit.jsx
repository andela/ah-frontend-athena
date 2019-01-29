import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import axios from "axios";
import { updateProfile, getProfile } from "../../../actions/profileActions";
import ProfileEdit from "../../../components/profile/profileEdit/profileEdit";

export class profileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      bio: ""
    };
  }

  componentDidMount() {
    const { getProfile } = this.props;
    const { username } = this.props;
    getProfile(username);
  }

  componentWillReceiveProps(nextProps) {
    const { profile } = nextProps;
    if (profile) {
      this.setState(profile);
    }
  }

  Change = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Submit = e => {
    e.preventDefault();
    const { history } = this.props;
    const { updateProfile } = this.props;
    const update = {
      ...this.state,
      image: window.localStorage.getItem("img_url")
    };
    updateProfile(update);
    history.push("/");
  };

  onChange = e => {
    let file = e.target.files[0];
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dg9r6tqlo/upload";
    const CLOUDINARY_UPLOAD_PRESET = "hhg6ha8f";
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      data: formData
    })
      .then(res => {
        let img_url = res.data.secure_url;
        window.localStorage.setItem("img_url", img_url);
        window.localStorage.setItem("image_url", img_url);
        window.location.reload();
      })
      .catch(err => err);
  };

  render() {
    const values = {
      ...this.state
    };
    return (
      <ProfileEdit
        data={values}
        Change={this.Change}
        Submit={this.Submit}
        onchange={this.onChange}
      />
    );
  }
}
profileEdit.propTypes = {
  getProfile: propTypes.func,
  updateProfile: propTypes.func,
  username: propTypes.string,
  history: propTypes.shape({}),
  profile: propTypes.shape({})
};
profileEdit.defaultProps = {
  getProfile: () => {},
  updateProfile: () => {},
  username: "",
  history: {},
  profile: {}
};
export const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile.data,
    username: ownProps.match.params.username
  };
};

export default connect(
  mapStateToProps,
  { updateProfile, getProfile }
)(profileEdit);
