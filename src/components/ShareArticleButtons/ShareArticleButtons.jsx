import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";

export const ShareArticleButtons = () => (
  <div>
    <FacebookShareButton
      className="share-button"
      url={window.location.href}
      style={{ marginBottom: "8px" }}
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <TwitterShareButton
      className="share-button"
      url={window.location.href}
      style={{ marginBottom: "8px" }}
    >
      <TwitterIcon size={32} round />
    </TwitterShareButton>
    <EmailShareButton
      className="share-button"
      url={window.location.href}
      style={{ marginBottom: "8px" }}
    >
      <EmailIcon size={32} round />
    </EmailShareButton>
  </div>
);

export default ShareArticleButtons;
