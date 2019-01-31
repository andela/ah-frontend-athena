import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GetReportedAction } from "../../actions/ReportArticleAction";
import "./ReportedArticles.scss";

export class ReportedArticles extends Component {
  constructor() {
    super();
    this.state = {
      reportedArticles: []
    };
  }

  componentDidMount() {
    const { GetReportedAction } = this.props;
    GetReportedAction();
  }

  componentWillReceiveProps(nextProps) {
    const { reportedArticles } = nextProps;
    if (reportedArticles) {
      this.setState({
        reportedArticles: reportedArticles
      });
    }
  }

  render() {
    const capitalizeFirstLetter = string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const returnArticleTitle = slug => {
      const titleArray = slug.split("-");
      titleArray.pop();
      return capitalizeFirstLetter(titleArray.join(" "));
    };

    const { reportedArticles } = this.state;
    const list = reportedArticles.map(item => {
      let title = returnArticleTitle(item.article_slug);
      return (
        <li key={item.article_id} className="mt-5 container grey-bg">
          <div className="p-1">
            <th>
              <h2>{title}</h2>
            </th>
            <table>
              <tr>
                <td>
                  <strong>Reason:</strong>
                </td>
                <td>
                  <strong>Date:</strong>
                </td>
                <td>
                  <strong>Username:</strong>
                </td>
                <td>
                  <strong>Email:</strong>
                </td>
              </tr>

              <tr>
                <td>{item.reason}</td>
                <td>{item.reported_at}</td>
                <td>{item.reported_by.username}</td>
                <td>{item.reported_by.email}</td>
              </tr>
            </table>
          </div>
        </li>
      );
    });
    if (list.length === 0) {
      return (
        <div className="text-center">
          <h2>
            Either there are no reported articles or you are not authorized to
            view this page
          </h2>
        </div>
      );
    } else
      return (
        <ul className="mt-5 d-flex flex-column">
          <h1 className="text-center">Reported Articles</h1>
          {list}
        </ul>
      );
  }
}

export const mapStateToProps = state => {
  return {
    reportedArticles: state.report.reportedArticles.articles
  };
};

ReportedArticles.propTypes = {
  GetReportedAction: PropTypes.func.isRequired,
  reportedArticles: PropTypes.shape({}).isRequired
};

export default connect(
  mapStateToProps,
  {
    GetReportedAction
  }
)(ReportedArticles);
