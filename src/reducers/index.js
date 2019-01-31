import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import signupReducers from "./signupReducer";
import googleAuthReducer from "./googleAuthReducer";
import facebookAuthReducer from "./facebookAuthReducer";
import profileReducer from "./profileReducer";
import PasswordResetReducer from "./passwordReducers/PasswordResetReducer";
import articleReducer from "./articleReducers/ArticleReducer";
import tagsReducer from "./tagsReducer";
import likesReducer from "./LikesReducer";
import userFollowReducer from "./userFollowReducer";
import getMyBookmarkedArticlesReducer from "./getMyBookmarkedArticlesReducer";
import CommentReducer from "./CommentReducer";
import readingStatsReducer from "./ReadingStatsReducer";
import bookmarksChanges from './bookmarkReducer';
import ReportArticleReducer from "./ReportArticleReducer";

const rootReducer = combineReducers({
  user: signupReducers,
  login: LoginReducer,
  articles: articleReducer,
  googleLogin: googleAuthReducer,
  facebookLogin: facebookAuthReducer,
  profile: profileReducer,
  passwordResetConfirm: PasswordResetReducer,
  likes: likesReducer,
  follow: userFollowReducer,
  tags: tagsReducer,
  bookmarks: getMyBookmarkedArticlesReducer,
  comment: CommentReducer,
  bookmarksChanges: bookmarksChanges,
  my_articles: readingStatsReducer,
  report: ReportArticleReducer
});
export default rootReducer;
