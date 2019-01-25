import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ArticleList } from "./ArticleList";

jest.mock("react-router-dom");
let newArticle = {
  title: "title",
  description: "description",
  body: "this is body",
  author: {
    username: "henry"
  }
};

let articleDta = {
  articles: {
    results: [
      {
        title: "title",
        description: "description",
        body: "this is body",
        author: {
          username: "henry"
        }
      }
    ]
  }
};

const intitialState = {
  articles: []
};

describe("<ArticleList>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ArticleList {...newArticle} />);
  });
  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should mount article Item", () => {
    const mockStore = configureStore();
    let store = mockStore(intitialState);
    let wrapp = shallow(
      <Provider store={store}>
        <ArticleList {...articleDta} />
      </Provider>
    );
    expect(wrapp.state("storeState")).toEqual({articles: []})
  });

  it("should handle empty articles in next props properly", () => {
    wrapper.setProps({ articles: [] });
    expect(wrapper.instance().props.articles).toEqual([]);
  });
});

