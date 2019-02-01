import ArticleReducer from '../articleReducers/ArticleReducer';
import actionTypes from '../../actions/actionTypes';

const initialState = {
  article: {},
  articles: [],
  view_article: {},
  edit_article: {},
  delete_article: {},
  new_article_rate: {},
  fullArticle: {},
  pages: {},
  readtime: {}
};

describe('test article reducer', () => {
  it('should return the initial state unknow action type', () => {
    expect(ArticleReducer(undefined, {})).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      view_article: {},
      readtime: {}
    });
  });
  it('should return new state on create article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.CREATE_ARTICLE,
        payload: {
          id: 1,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({
      article: { body: 'article body', id: 1, slug: 'moked-slag' },
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      readtime: {},
      view_article: {}
    });
  });

  it('should return new state on get all articles article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.GET_ARTICLES,
        pages: {
          total_pages: 1,
          current_page: 1
        },
        payload: [
          {
            id: 1,
            body: 'article body',
            slug: 'moked-slag'
          },
          {
            id: 1,
            body: 'article body',
            slug: 'moked-slag'
          }
        ]
      })
    ).toEqual({
      article: {},
      articles: [
        { body: 'article body', id: 1, slug: 'moked-slag' },
        { body: 'article body', id: 1, slug: 'moked-slag' }
      ],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: { current_page: 1, total_pages: 1 },
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      new_article_rate: {},
      readtime: {},
      view_article: {}
    });
  });

  it('should return new state on get single article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.GET_SINGLE_ARTICLE,
        payload: { id: 10, body: 'article body', slug: 'moked-slag' }
      })
    ).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      view_article: { body: 'article body', id: 10, slug: 'moked-slag' },
      readtime: {}
    });
  });

  it('should return new state on edit single article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.EDIT_ARTICLE,
        payload: {
          id: 10,
          body: 'article body',
          slug: 'moked-slag'
        }
      })
    ).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: { body: 'article body', id: 10, slug: 'moked-slag' },
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      view_article: {},
      readtime: {}
    });
  });

  it('should return new state on delete article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.DELETE_ARTICLE,
        payload: { message: 'Article successfully deleted' }
      })
    ).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: { message: 'Article successfully deleted' },
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      view_article: {},
      readtime: {}
    });
  });
  it('should return new state on rating article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.RATE_ARTICLE,
        payload: 1,
        view_article: {},
        new_article_rate: {},
        readtime: {}
      })
    );
  });
  it('should show that read time of an article has been recorded', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.READ_TIME,
        payload: { message: 'Done' }
      })
    ).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      view_article: {},
      readtime: { message: 'Done' }
    });
  });
  it('should return new state on search article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.STORE_PARAM,
        payload: 'andela'
      })
    ).toEqual({
      article: {},
      articles: [],
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: 'andela',
      totalPages: 1,
      view_article: {},
      readtime: {}
    });
  });
  it('should return new state on search article', () => {
    expect(
      ArticleReducer(undefined, {
        type: actionTypes.TAGGED_ARTICALS,
        payload: { articles: 'hey' }
      })
    ).toEqual({
      article: {},
      articles: { articles: 'hey' },
      currentPage: 1,
      delete_article: {},
      edit_article: {},
      fullArticle: {},
      new_article_rate: {},
      searchParam: '',
      totalPages: 1,
      view_article: {},
      readtime: {}
    });
  });
});
