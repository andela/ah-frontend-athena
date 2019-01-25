import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Rate, { Star, RatingView } from "./RatingView";

const mockStore = configureStore();
const initialState = {
  articles: {
    new_article_rate: { rating: 2 },
    view_article: {
      article: {
        avg_rating: 5
      }
    }
  }
};
const props = {
  article: {
    avg_rating: 2
  },
  rateArticle: () => {},
  starClick: () => {}
};

let store = mockStore(initialState);
describe("<RatingView />", () => {
  let wrapper;
  let wrapper2;

  beforeEach(() => {
    wrapper = shallow(<Rate newRate={3} />);
    wrapper2 = shallow(<RatingView newRate={3} {...props} />);
  });

  it("matches snapshort", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should next props", () => {
    wrapper.setProps({ newRate: 1 });
    wrapper.setProps({ newRate: 5 });
    expect(wrapper.instance().props.newRate).toEqual(5);
  });
  it("full star matches snapshort", () => {
    const options = {
      handleKeyDown: jest.fn(),
      starClick: jest.fn()
    };
    const star = shallow(<Star options={options} isFull index={2} />);
    star.find("div").simulate("click");
    wrapper2.instance().starClick(2);
    wrapper2.instance().handleKeyDown();

    expect(star).toMatchSnapshot();
  });

  it("empty star display", () => {
    const options = {
      handleKeyDown: jest.fn(),
      starClick: jest.fn()
    };
    const star = shallow(<Star options={options} isFull={false} index={2} />);
    star.find("div").simulate("click");
    expect(star).toMatchSnapshot();
  });
  it("five star display load", () => {
    const mountRatingView = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Rate {...props} />
        </MemoryRouter>
      </Provider>
    );
    mountRatingView.setProps({ newRate: 1 });
    expect(mountRatingView.find(Star).length).toBe(5);
  });
});
