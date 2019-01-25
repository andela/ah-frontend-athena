import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBIcon } from 'mdbreact';
import './RatingView.scss';
import rateArticle from '../../../actions/articleActions/RateArticleActions';
import ModalPage from '../../Likes/LoginModal';

export const Star = ({ index, options, isFull }) => {
  let starFull = `primary-text-color star-hover`;
  let starEmpty = `primary-text-color star-hover`;
  if (isFull) {
    starFull = `${starFull} `;
    starEmpty = `${starEmpty} d-none`;
  } else {
    starFull = `${starFull} d-none`;
    starEmpty = `${starEmpty}`;
  }
  return (
    <div
      onKeyUp={options.handleKeyDown}
      role="link"
      tabIndex={-1}
      onClick={() => {
        options.starClick(index);
      }}
    >
      <MDBIcon icon="star" className={starFull} />
      <span href="#" className={starEmpty}>
        <i className="fa fa-star-o" />
      </span>
    </div>
  );
};

Star.propTypes = {
  options: PropTypes.shape({}).isRequired,
  isFull: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

export class RatingView extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, ratings: ['', '', '', '', ''] };
  }
  componentDidMount() {
    const { article } = this.props;
    const ratingNumber = article.avg_rating;
    this.newRating(ratingNumber);
  }
  componentWillReceiveProps(nextProps) {
    const { newRate } = nextProps;
    this.newRating(newRate);
  }
  newRating = ratingNumber => {
    let { ratings } = this.state;
    ratingNumber = ratingNumber - 1;
    for (let index = 0; index < 5; index++) {
      if (index <= ratingNumber) {
        ratings[index] = '1';
      } else {
        ratings[index] = '';
      }
    }
    this.setState({ ratings: ratings });
  };
  starClick = ratingNumber => {
    const { article, rateArticle } = this.props;
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({
        modal: false
      });
      rateArticle(ratingNumber + 1, article.slug);
    } else {
      this.setState({
        modal: true
      });
    }
  };
  handleKeyDown = () => {};
  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal
    });
  };

  render() {
    const { ratings, modal } = this.state;
    const { history } = this.props;
    const url = window.location.pathname;

    const stars = ratings.map((item, i) => {
      const key = `m${i}`;
      const options = {
        handleKeyDown: this.handleKeyDown,
        starClick: this.starClick
      };
      if (item === '1') {
        return (
          <li className="m-1" key={key}>
            <Star options={options} isFull index={i} />
          </li>
        );
      } else {
        return (
          <li className="m-1" key={key}>
            <Star options={options} isFull={false} index={i} />
          </li>
        );
      }
    });
    return (
      <ul>
        {stars}
        <ModalPage
          title="Please login before you can rate the article"
          modal={modal}
          toggle={this.toggle}
          fallback={url}
          history={history}
          md="12"
        />
      </ul>
    );
  }
}
RatingView.propTypes = {
  rateArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  article: PropTypes.shape({}).isRequired,
  newRate: PropTypes.number
};
RatingView.defaultProps = {
  newRate: 0
};

const mapStateToProps = state => {
  return {
    newRate: state.articles.new_article_rate.rating,
    article: state.articles.view_article
  };
};

export default connect(
  mapStateToProps,
  { rateArticle }
)(RatingView);
