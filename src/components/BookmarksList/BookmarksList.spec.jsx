import React from "react";
import { shallow } from "enzyme";
import BookmarksList from "./BookmarksList";

let props = {
  articles: [
    {
      id: 3,
      article: 33,
      profile: 7,
      article_slug: "demo-following-a12e4852a6fc"
    },
    {
      id: 2,
      article: 36,
      profile: 7,
      article_slug:
        "how-top-performing-college-grads-fall-into-the-prestige-career-trap-7d76a6e1eebe"
    },
    {
      id: 1,
      article: 53,
      profile: 7,
      article_slug: "how-to-train-your-dragon-f7cb408048ca"
    }
  ]
};
describe("Testing BookmarksList", () => {
  let wrapper;

  it("should render the BookmarksList when there is data", () => {
    wrapper = shallow(<BookmarksList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the BookmarksList when there is no data", () => {
    wrapper = shallow(<BookmarksList />);
    expect(wrapper).toMatchSnapshot();
  });
});
