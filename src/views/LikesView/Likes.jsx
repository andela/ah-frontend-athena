import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LikesButtons from "../../components/Likes/LikesButtons";
import {
  clickLikeIcon,
  clickDisLikeIcon,
  getLikeStatus
} from "../../actions/LikesAction";
import ModalPage from "../../components/Likes/LoginModal";

export class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: "",
      modal: false,
      likes_count: ""
    };
  }
  componentDidMount = () => {
    const { article_info, getLikeStatus } = this.props;
    this.setState({ likes_count: article_info.likes_count });
    if (window.localStorage.getItem("token")) {
      getLikeStatus(article_info.slug);
    } else {
      this.setState({ like: "" });
    }
  };
  componentWillReceiveProps = nextProps => {
    if (JSON.stringify(nextProps.likesData) === "{}") {
      const { like, detail } = nextProps.returnData;
      if (like === "" || detail === "Invalid token. please login again") {
        this.setState({ like: "" });
      } else {
        const val = JSON.parse(like);
        this.setState({ like: val });
      }
    } else {
      const { like, article } = nextProps.likesData;
      const { likes_count } = article;
      this.setState({ like: like });
      this.setState({ likes_count: likes_count });
    }
  };
  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };

  changeColor = like => {
    let icons = { icon1: "", icon2: "" };
    if (like === "") {
      icons.icon1 = "blue-grey-text ml-2";
      icons.icon2 = "blue-grey-text pr-3";
    } else if (like === true) {
      icons.icon1 = "blue-text ml-2";
      icons.icon2 = "blue-grey-text pr-3";
    } else if (like === false) {
      icons.icon1 = "blue-grey-text ml-2";
      icons.icon2 = "blue-text pr-3";
    }
    return icons;
  };
  clickIcon1 = () => {
    const { article_info, clickLikeIcon, returnData } = this.props;
    const { detail } = returnData;
    if (
      window.localStorage.getItem("token") != null &&
      detail !== "Invalid token. please login again"
    ) {
      clickLikeIcon(article_info.slug);
    } else {
      this.setState({ url: window.location.pathname });
      this.toggle();
    }
  };
  clickIcon2 = () => {
    const { article_info, clickDisLikeIcon, returnData } = this.props;
    const { detail } = returnData;
    if (
      window.localStorage.getItem("token") != null &&
      detail !== "Invalid token. please login again"
    ) {
      clickDisLikeIcon(article_info.slug);
    } else {
      this.setState({ url: window.location.pathname });
      this.toggle();
    }
  };

  render() {
    const { like, likes_count, modal, url } = this.state;
    const { history } = this.props;
    return (
      <div>
        <LikesButtons
          like={() => this.changeColor(like)}
          onClick={this.clickIcon1}
          onClick2={this.clickIcon2}
          likes_count={likes_count}
        />
        <ModalPage
          title="Please login before you can like or dislike the article"
          modal={modal}
          toggle={this.toggle}
          fallback={url}
          history={history}
          md="12"
        />
      </div>
    );
  }
}
Likes.propTypes = {
  returnData: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  likesData: PropTypes.shape({}),
  clickLikeIcon: PropTypes.func,
  clickDisLikeIcon: PropTypes.func,
  getLikeStatus: PropTypes.func,
  article_info: PropTypes.shape({}).isRequired
};
Likes.defaultProps = {
  returnData: {},
  likesData: {},
  clickLikeIcon: () => {},
  clickDisLikeIcon: () => {},
  getLikeStatus: () => {}
};
export const mapStateToProps = state => {
  return {
    returnData: state.likes.like_status,
    likesData: state.likes.likes
  };
};
export const mapDispatchToProps = {
  clickLikeIcon,
  clickDisLikeIcon,
  getLikeStatus
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Likes);
