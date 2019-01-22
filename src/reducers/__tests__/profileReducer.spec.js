import profileReducer from '../profileReducer';
import actionTypes from '../../actions/actionTypes';

const initialState = {
    data: {},
}

describe('test Profile Reducer', () => {
  it('test empty reducer', () => {
    expect(profileReducer(undefined, {})).toEqual(initialState)
  })
  it('test for get profile case', () => {
    let res = profileReducer(initialState, {
      type: actionTypes.GET_PROFILE,
      payload: {
        'username': 'Ntale',
        'email': 'Ntale@andela.com',
        'bio': ''
      }
    })
    expect(res).toEqual({
      data: {
        'username': 'Ntale',
        'email': 'Ntale@andela.com',
        'bio': ''
      }
    })
  })
  it('test for update profile case', () => {
    let res = profileReducer(initialState, {
      type: actionTypes.UPDATE_PROFILE,
      payload: {
        'username': 'Ntale',
        'email': 'Ntaley@andela.com',
        'image': '',
        'bio': '...'
      }
    })
    expect(res).toEqual({
      data: {
        'username': 'Ntale',
        'email': 'Ntaley@andela.com',
        'image': null,
        'bio': undefined
      }
    })
    

  })
})
