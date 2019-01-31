import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MDBBtn, MDBInput } from "mdbreact";
import { ReportArticleAction } from "../../actions/ReportArticleAction";

export class ReportView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { reason } = this.state;
    const { ReportArticleAction, article } = this.props;
    ReportArticleAction(article.slug, reason);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { reason } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="grey-text">
            <MDBInput
              name="reason"
              label="Enter reason here"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              value={reason}
              onChange={this.handleChange}
            />
          </div>
          <MDBBtn className="btn" color="primary" type="submit">
            Submit
          </MDBBtn>
        </form>
      </div>
    );
  }
}

ReportView.propTypes = {
  ReportArticleAction: PropTypes.func.isRequired,
  article: PropTypes.shape({}).isRequired
}


export default connect(
  null,
  {
    ReportArticleAction
  }
)(ReportView);
