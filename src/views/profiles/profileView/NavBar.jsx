import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from 'prop-types'
import ViewProfile from "../../../components/profile/profileView/profileView";
import { getProfile } from "../../../actions/profileActions";
import avatar from "../../../components/profile/img/default.png";

export const limitBio = bio => {
  let trimmedBio = bio.substring(0, 50);
  if (bio <= trimmedBio) {
    return bio;
  } else {
    let newBio = trimmedBio + "...";
    return newBio;
  }
};

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "dropdown-menu col-md-12 school-options-dropdown text-center ",
      isShow: false,
      profile: {},
      classValue: "d-none",
      image: avatar
    };
  }

  componentDidMount() {
    const username = window.localStorage.getItem("username");
    const token = window.localStorage.getItem("token");
    const {isShow} = this.state

    if (token) {
      const {getProfile} = this.props
      getProfile(username);
      this.setState({ classValue: ""});
    } else {
      this.setState({ classValue: "d-none"});
    }
    const cls = "dropdown-menu dropdown-menu-left dropdown-secondary ";
    if (isShow) {
      this.setState({ show: cls + "show", isShow: false });
    } else {
      this.setState({ show: cls + "", isShow: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    let {profile} = nextProps;
    let username = profile.username;
    if (username) {
      this.sortImage(nextProps);
      const bio = profile.bio;
      let profileObject = {
          ...nextProps.profile,
          bio: limitBio(bio)
        };
      this.setState({ profile: profileObject });
      this.setState({ classValue: "" });
      if (!profile.username) {
        const {getProfile} = this.props
        getProfile(username);
      }
    } else {
      this.setState({ classValue: "d-none"});
    }
  }
  toggleNow = e => {
    e.preventDefault();
    const cls = "dropdown-menu dropdown-menu-left dropdown-secondary ";
    const {isShow} = this.state
    if (isShow) {
      this.setState({ show: cls + "show", isShow: false });
    } else {
      this.setState({ show: cls + "", isShow: true });
    }
  };
  sortImage = state => {
    if (!state.profile.image) {
      this.setState({ image: avatar });
    } else {
      this.setState({ image: state.profile.image });
    }
  };
  Click = e => {
    e.preventDefault();
    window.localStorage.removeItem("image_url");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.location.href = "/login";
  };
  Edit = e => {
    e.preventDefault();
    const {image, profile} = this.state
    const image_url = image;
    const username = profile.username;
    if (image_url === "") {
      window.localStorage.setItem("image_url", avatar);
      this.setState({ classValue: "d-none" });
      window.location.href = `/profile/${username}`;
    } else {
      window.localStorage.setItem("image_url", image_url);
      this.setState({ classValue: "d-none" });
      window.location.href = `/profile/${username}`;
    }
  };
  render() {
    const {image} = this.state;
    const {classValue} = this.state;
    const {show} = this.state;
    const {profile} = this.state
    return (
      <ViewProfile
        imageShow={image}
        Clicked={this.toggleNow}
        classValue={classValue}
        attribute={show}
        profile={profile}
        Click={this.Click}
        Edit={this.Edit}
      />
    );
  }
}

NavBar.propTypes = {
  profile: propTypes.shape({}),
  getProfile: propTypes.func
}
NavBar.defaultProps = {
  profile: {},
  getProfile: ()=>{},
}
export const mapStateToProps = state => {
  return {
    profile: state.profile.data
  };
};
export default connect(
  mapStateToProps,
  { getProfile }
)(NavBar);
