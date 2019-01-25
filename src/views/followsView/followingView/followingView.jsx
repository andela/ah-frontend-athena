import React, { Component } from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getFollowing } from "../../../actions/userFollowActions";
import ViewFollowing from "../../../components/userFollowing/viewFollowing/viewFollowing";
import avatar from "../../../components/profile/img/default.png";

class Following extends Component {
  state = {
    followingData: []
  };
  componentDidMount() {
    const { getFollowing } = this.props;
    getFollowing();
  }
  componentWillReceiveProps(nextProps) {
    const { following } = nextProps;
    this.setState({ followingData: following });
  }
  render() {
    const { followingData } = this.state;
    let i = 0;
    const imageShow = image => {
      if (image === "") {
        return avatar;
      } else {
        return image;
      }
    };
    if (!Array.isArray(followingData) || !followingData.length) {
      return <div />;
    } else if (Array.isArray(followingData)) {
      return (
        <div>
          <i className="fa fa-home flex flex-center"></i>
          {followingData.map(followers => {
            return (
              <div>
                <ViewFollowing
                  key={i++}
                  Image={imageShow(followers.image)}
                  Username={followers.username}
                  Bio={followers.bio}
                  Email={followers.email}
                />
              </div>
            );
          })}
        </div>
      );
    }
  }
}
Following.propTypes = {
  getFollowing: propTypes.func,
  following: propTypes.shape([])
};
Following.defaultProps = {
  getFollowing: () => {},
  following: []
};
export const mapStateToProps = state => {
  return {
    following: state.follow.data
  };
};

export default connect(
  mapStateToProps,
  { getFollowing }
)(Following);
